'use client'
import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/assets/images/logo.svg";
import { useEffect, useState } from "react";
import {signIn, signOut, getProviders, useSession} from "next-auth/react";
export const Navbar  = () => {
    const {data: currentUser} = useSession();
    // const {accessToken} = currentUser;
    const [providers, setProviders] = useState(null);
    const [toggleDrowdown, setToggleDrowdown] = useState(false);
    // console.log("Access Token : ", accessToken);
    useEffect( () => {
        ( async() =>{
            const responce = await getProviders();
            setProviders(responce);
         })();
    },[]);
  return (
    <nav className="w-full flex-between mt-6">
        <Link href={"/"} className="flex items-center gap-2">
            <Image
                src={logoImg}
                width={37} 
                height={37}
                alt="Logo"
                className="object-contain"
            ></Image>
            <p className="logo_text text-center sm:flex hidden">Promptopia</p>
        </Link>
        <div className="sm:flex gap-5 hidden">
            <Link href={"/create-prompt"} className="black_btn">Create Prompt</Link>
            {
                currentUser?.user?(
                    <>
                        <button 
                            onClick={() => signOut()}
                            className="outline_btn">
                            Sing out
                        </button>
                        <Link href={"/profile"}>
                            <Image
                                src={currentUser?.user.image}
                                width={47}
                                height={47}
                                alt="User"
                                className="rounded-full object-contain"
                            >
                            </Image>
                        </Link>
                    </>
                ):<>
                    {
                        providers && Object.values(providers).map((provider) =>(
                            <button
                                type="button"
                                key={provider?.name}
                                onClick={() => signIn(provider?.id)}
                                className="black_btn"
                            >
                                Sing In
                            </button>
                        ))
                    }
                </>             
            }
        </div>

        <div className="sm:hidden flex relative">
            {
                currentUser?.user?(
                    <div className="flex">
                        <Image
                            src={currentUser?.user.image}
                            width={37} 
                            height={37}
                            alt="Logo"
                            className="rounded-full object-contain"
                            onClick={() => setToggleDrowdown((prev) => !prev)}
                        >
                        </Image> 
                        {
                            toggleDrowdown&&(
                                <div className="dropdown shadow-md">
                                    <Link 
                                        className="dropdown_link" 
                                        href={"/profile"}
                                        onClick={() =>  setToggleDrowdown(false)}>
                                        Profile
                                    </Link>
                                    <Link 
                                        onClick={() =>  setToggleDrowdown(false)}
                                        className="dropdown_link" 
                                        href={"/create-prompt"}>
                                        Create Prompt
                                    </Link>
                                    <button 
                                        onClick={() => {signOut() , setToggleDrowdown(false)}} 
                                        className="black_btn">
                                        Sign Out
                                    </button>
                                </div>
                            )
                        }
                    </div>
                ):<>
                    {
                        providers && Object.values(providers).map((provider) =>(
                            <button
                                type="button"
                                key={provider?.name}
                                onClick={() => signIn(provider?.id)}
                                className="black_btn"
                            >
                                Sign In
                            </button>
                        ))
                    }
                </>
            }
        </div>
    </nav>
  )
}
