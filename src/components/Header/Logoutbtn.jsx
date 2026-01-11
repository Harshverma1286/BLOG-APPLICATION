import React from "react";

import {useDispatch} from 'react-redux';

import authservice from '../../appwrite/auth';

import {logout as logoutslice} from '../../Store/authslice'


function LogoutButton(){

    const dispatch = useDispatch();

    const Logouthandle = ()=>{
        authservice.logout().then(()=>{
                dispatch(logoutslice());
        })
    }
    return (
        <button
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={Logouthandle}>LogOut</button>
    )
}

export default LogoutButton;