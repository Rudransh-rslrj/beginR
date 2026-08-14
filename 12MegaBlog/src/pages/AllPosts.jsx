import React from 'react'
import { useState,useEffect } from 'react'
import { Container, PostCard } from '../components/Index'
import appwriteService from "../appwrite/config"
function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        appwriteService.getPosts().then((result)=>{
            if(result && Array.isArray(result.rows)){
                setPosts(result.rows)
            } else {
                setPosts([])
            }
        }).catch(()=>{
            setPosts([])
        })
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {posts && posts.length > 0 ? posts.map((post)=>
                 (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                )
            ) : (
                <p className='text-center w-full py-10'>No posts available.</p>
                
            )}
            </div>
        </Container>
      
    </div>
  )
}

export default AllPosts