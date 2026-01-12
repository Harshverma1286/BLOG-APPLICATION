import React, { useState } from "react";

import { Link } from "react-router-dom";

import appwriteservice from '../appwrite/auth';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {Button,Input,Logo} from './index';

import { useForm } from "react-hook-form";
import {Login as authLogin} from "../Store/authslice";
import { useForm } from "react-hook-form";

function Signin(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[error,seterror] = useState("");

    const {register,handleSubmit} = useForm();

    const sign = async(data)=>{
        try {
            seterror('');
            const user = await appwriteservice.createAccount(data);

            if(user){
                const userdata = await appwriteservice.currentuser();

                if(userdata){
                    dispatch(authLogin(userdata));
                }
                navigate('/');
            }
        } catch (error) {
            seterror(error.message);
        }
    }
    return (
    <div className="flex item-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline">
                            sign In
                        </Link>
                </p>   
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(sign)}>
                    <div className="space-y-5">
                        <Input
                        label="Name :"
                        placeholder="Enter your name :"
                        {...register("name",{
                            required:true,

                        })}
                        />
                        <Input
                        label="Email :"
                        placeholder="Enter Your Email :"
                        type="email"
                        {...register("email",{
                            required:true,
                            validate:{
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="password :"
                        placeholder="Enter your password :"
                        type="password"
                        {...register("password",{
                            required:true,
                        })}
                        />
                        <Button type="submit" className="w-full">create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Signin;