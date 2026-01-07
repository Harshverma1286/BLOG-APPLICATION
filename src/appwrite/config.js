import conf from "../conf/conf";

import {Client,ID,Databases,Storage,Query} from 'appwrite'


export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid);

        this.databases = new Databases();
        this.bucket = new Storage();
    }


    async createPost({title,slug,content,featuredimage,status,userid}){
        try {
           return this.databases.createDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug,
            {
                title,
                featuredimage,
                content,
                status,
                userid
            }
           ) 
        } catch (error) {
            console.log("appwrite error",error);
            throw error;
        }
    }


    async updatedocument(slug,{title,content,featuredimage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )            
        } catch (error) {
            console.log("appwrite error :",error);
            throw error;
        }
    }


    async deletepost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    async getpost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    async getallposts(){
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    async deletefile(fileid){
        try {
          await this.bucket.deleteFile(
            conf.appwritebucketid,
            fileid
          )  
          return true
        } catch (error) {
            console.log("appwrite error :",error);
            return false;
        }
    }

    getFilePreview(fileid){
        return this.bucket.getFilePreview(
            conf.appwritebucketid,
            fileid
        )
    }






};

const service = new Service();

export default service;