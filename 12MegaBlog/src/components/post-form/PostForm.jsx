import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm({ post }) {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

   const submit = async (data) => {

        // EDIT EXISTING POST
        if (post) {

            // Upload new image only if user selected one
            const file = data.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null

            // Store old image ID
            const oldImageId = post.featuredimage

            // Update post first
            const dbPost = await appwriteService.updatePost(
                post.$id,
                {
                    ...data,
                    featuredImage: file
                        ? file.$id
                        : oldImageId
                }
            )

            if (dbPost) {

                // Delete old image only after database update succeeds
                if (file && oldImageId) {
                    await appwriteService.deleteFile(oldImageId)
                }

                navigate(`/post/${dbPost.$id}`)
            }

        }

        // CREATE NEW POST
        else {

            const file = await appwriteService.uploadFile(
                data.image[0]
            )

            if (file) {

                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id,
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }


    // =========================
    // SLUG TRANSFORMATION
    // =========================

    const slugTransform = useCallback((value) => {

        if (value && typeof value === 'string') {

            const slug = value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')

            setValue('slug', slug)

            return slug
        }

        return ''

    }, [setValue])


    useEffect(() => {

        const subscription = watch((value, { name }) => {

            if (name === 'title') {

                setValue(
                    'slug',
                    slugTransform(value.title),
                    {
                        shouldValidate: true
                    }
                )
            }

        })

        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])


    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap"
        >

            {/* =========================
                LEFT SIDE
            ========================= */}

            <div className="w-2/3 px-2">

                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {
                        required: true
                    })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue(
                            "slug",
                            slugTransform(e.currentTarget.value),
                            {
                                shouldValidate: true
                            }
                        )
                    }}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />

            </div>


            {/* =========================
                RIGHT SIDE
            ========================= */}

            <div className="w-1/3 px-2">

                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: !post
                    })}
                />


                {/* Show existing image while editing */}

                {post && (
                    <div className="w-full mb-4">

                        <img
                            src={appwriteService.getFilePreview(
                                post.featuredimage
                            )}
                            alt={post.title}
                            className="rounded-lg"
                        />

                    </div>
                )}


                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", {
                        required: true
                    })}
                />


                <Button
                    type="submit"
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>

            </div>

        </form>
    )
}

export default PostForm