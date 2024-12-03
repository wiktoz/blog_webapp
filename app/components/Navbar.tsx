'use client'

import Image from "next/image"
import Link from "next/link"
import navbar from '../config/navbar.json'
import { useState, useEffect } from 'react'
import { BellIcon, UserIcon } from "@heroicons/react/24/outline"

const Navbar = () => {
    const [user, setUser] = useState<UserMeResponseInterface>()

    useEffect(() => {
        fetch("/api/users/me", {
            method: "GET",
        })
        .then(async (res) => {
            const resData = await res.json()

            if(res.status === 200) {
                setUser(resData)
            }
        })
    })

    return (
        <nav className="flex flex-row justify-between px-6 py-2 bg-primary">
            <div className="flex flex-row items-center gap-6">
                <div className="m-2">
                    <Link href="/">
                        <Image src="/img/logo2.png" alt="logo" height={100} width={50}/>
                    </Link>
                </div>
                <div className="flex flex-row gap-6">
                    {
                        navbar && navbar.links && navbar.links.map(link => {
                            return (
                                <Link key={link.name} href={link.url}>
                                    {link.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            {
                user ? 

                <div className="flex flex-row items-center gap-4">
                    <BellIcon width={20} height={20} />

                    <Link href={"/user/profile"}>
                        <UserIcon width={20} height={20} />
                    </Link>
                </div>

                :

                <div className="flex flex-row items-center gap-4">
                    <Link href="/auth/sign-in">
                        <div className="font-semibold">
                            Log In
                        </div>
                    </Link>
                    <Link href="/auth/sign-up">
                        <div className="bg-secondary w-fit py-2 px-6 font-semibold">
                            Sign Up
                        </div>
                    </Link>
                </div>
            }
        </nav>
    )
}

export default Navbar