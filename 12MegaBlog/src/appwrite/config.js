import conf from "../conf/conf";
import { Client,ID,Databases, Storage,Query, TablesDB } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket; 
    constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl) 
           .setProject(conf.appwriteProjectId); 

        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionId,
                rowId:slug,
                data:{
                    title,
                    content,
                    featuredimage: featuredImage,
                    status,
                    userid: userId
                }
            })
        }
        catch(error){
            console.log("appwrite service :: services :: error", error);

        }
    }
    async updatePost( slug,{title, content, featuredImage, status}){
        try{
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionId,
                rowId:slug,
                data:{
                    title,
                    content,
                    featuredimage: featuredImage,
                    status
                }
            })
        }
        catch(error){
            console.log("appwrite service :: services :: error", error);

        }
    }
    async deletePost( slug){
        try{
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
            return true;
        }
        catch(error){
            console.log("appwrite service :: services :: error", error);
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
        }
        catch(error){
            console.log("appwrite service :: services :: error", error);
            return false;
        }      
    }
    async getPosts(){
        try{
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionId,
                queries: [
                    Query.equal('status','active')
                ]
            })
        }
        catch(error){
            console.log("appwrite service :: services :: error", error);
            return false;
        }      
    }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error", error);
            return false;
        }
    }
    // async deleteFile(fileId) {
    //     if (!fileId) return false;

    //     try {
    //         await this.bucket.deleteFile({
    //             bucketId: conf.appwriteBucketId,
    //             fileId,
    //         });

    //         return true;
    //     } catch (error) {
    //         console.log("appwrite service :: deleteFile :: error", error);
    //         return false;
    //     }
    // }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            });

            return true;
        } catch (error) {
            if (error.code === 404) {
                return true;
            }

            console.log("appwrite service :: deleteFile :: error", error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileId,
        })
    }

}


const service = new Service();
export default service