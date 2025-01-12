'use client'

import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import navbar from '@/app/config/navbar.json'
import { fetcher } from "@/app/utils/fetcher"
import { UserIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import Spinner from "@/app/components/Spinner"
import NotificationBell from "@/app/components/notifications/NotificationBell"
import api from "@/app/utils/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = () => {
    const router = useRouter()
    const { data: user, error: userError, isLoading: userLoading, mutate } = useSWR<UserMeResponseInterface>("/api/users/me", fetcher)
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

    const logout = async () => {
        setIsLoggingOut(true)

        await api.post("/api/auth/token/revoke/rtoken",  {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async () => {
            await api.post("/api/auth/token/revoke/atoken",  {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
        .finally(async () => {
            await mutate(undefined, { revalidate: true })
            setIsLoggingOut(false)
            return router.push("/auth/sign-in")
        })
        
    }

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