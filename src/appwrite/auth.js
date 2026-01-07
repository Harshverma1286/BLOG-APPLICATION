import conf from "../conf/conf";

import {Client,Account,ID} from 'appwrite';

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid)

        this.account = new Account();
    }


    async createAccount({email,password,name}){
        try{
            const useraccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )

            if(useraccount){
                return this.login({email,password});
            }
        }catch(error){
            console.log("APPwrite error",error);
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        } catch (error) {
            console.log("APPwrite error",error);
            throw error;
        }
    }

    async currentuser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("APPwrite error",error);
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSession();
        } catch (error) {
            console.log("APPwrite error",error);
            throw error;
        }
    }
};

const authService = new AuthService();

export default authService;