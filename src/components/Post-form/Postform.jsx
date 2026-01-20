import React from "react";

import { useForm } from "react-hook-form";

import {useSelector} from 'react-redux';

import {useNavigate} from 'react-router-dom';

import appwriteservice from '../../appwrite/config';
import {Button,Input,Select,RTE} from '../index';

function Postform({post}){
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.slug || '',
            content:post?.content || '',
            status:post?.status || 'active'
        }
    });

    const navigate = useNavigate();

    const userdata = useSelector((state)=> state.auth.userdata);


    const submit = async(data)=>{
        if(post){
            const file = data.image[0] ? await appwriteservice.uploadfile(data.image[0]) : null;

            if(file){
                appwriteservice.deletefile(post.featuredimage);
            }

            const dbpost = await appwriteservice.updatedocument(post.$id,{
                ...data,
                featuredimage:file ? file.$id : undefined
            })

            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }
        else{
            const file = data.image[0] ? await appwriteservice.uploadfile(data.image[0]) : null;

            if(file){

                const fileid = file.$id;
                data.featuredimage = fileid
                const newpost = await appwriteservice.createPost({
                    ...data,
                    userid:userdata.$id
                })

                if(newpost){
                    navigate(`/post/${newpost.$id}`)
                }
            }

        }
    }

    const slugtransform  = React.useCallback((value)=>{
            if(value && value==='string') return 
            value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-');
            
            return '';
    },[]);


    React.useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',setValue(value.title,{shouldValidate:true}))
            }
        })

        return ()=>{
            subscription.unsubscribe();
        }
    },[watch,slugtransform,setValue])


    return (
        <div>Post</div>
    )
}

export default Postform;