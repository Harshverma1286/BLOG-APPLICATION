import React from "react";

import { useDispatch,useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {Container,Logo, LogoutButton} from '../index';


function Header(){
    const Navigate = useNavigate();
    const authstatus = useSelector((state)=> state.auth.status);
    const navitems = [
        {
            name:"Home",
            slug:"/",
            active:true,
        },
        {
            name:"Login",
            slug:"/login",
            active:!currentstatus
        },
        {
            name:"Signup",
            slug:"/signup",
            active:!currentstatus
        },
        {
            name:"All Posts",
            slug:"/all-posts",
            active:currentstatus,
        },
        {
            name:"Add Post",
            slug:"/add-post",
            active:currentstatus,
        }
    ]

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link>
                        <Logo width="70px"/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navitems.map((items)=>
                            items.active ? (
                                <li key={items.name} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                                <button onClick={()=> Navigate(items.slug)}>{items.name}</button>
                            </li>
                            ) : null
                        )}
                        {authstatus && (
                            <li>
                                <LogoutButton/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;