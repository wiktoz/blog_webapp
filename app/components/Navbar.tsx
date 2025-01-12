'use client'

import Image from "next/image"
import Link from "next/link"
import navbar from '@/app/config/navbar.json'
import { UserIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import Spinner from "@/app/components/Spinner"
import NotificationBell from "@/app/components/notifications/NotificationBell"
import { useUser } from "@/app/context/UserContext"

const Navbar = () => {
    const { user, isLoggingOut, logout, isLoading: userLoading } = useUser()
    
    return (
        <nav className="flex flex-row justify-between px-6 py-2 bg-primary">
            <div className="flex flex-row items-center gap-2 md:gap-6">
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
            <div className="flex flex-row items-center gap-4">
            {
                isLoggingOut ?
                <div className="flex flex-row items-center gap-2">
                    Logging out
                    <Spinner/>
                </div>

                :
                userLoading ?
                    <Spinner/>
                :
                user ? 

                <>
                    
                    <Link href={"/user/profile"}>
                        <UserIcon width={20} height={20} />
                    </Link>

                    <ArrowRightStartOnRectangleIcon width={20} height={20} onClick={() => logout()} className="cursor-pointer"/>

                    <NotificationBell/>
                </>

                :

                <>
                    <Link href="/auth/sign-in">
                        <div className="font-semibold">
                            Log In
                        </div>
                    </Link>
                    <Link href="/auth/sign-up">
                        <div className="bg-secondary w-fit py-2 px-6 font-semibold rounded-lg">
                            Sign Up
                        </div>
                    </Link>
                </>
            }
            </div>
        </nav>
    )
}

export default Navbar