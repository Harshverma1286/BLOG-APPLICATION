const conf = {
    appwriteurl:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteprojectid:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteprojectname:String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    appwritedatabaseid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollectionid:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwritebucketid:String(import.meta.env.VITE_APPWRIE_BUCKET_ID),
};


export default conf;