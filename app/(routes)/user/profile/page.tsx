'use client'

import Button from "@/app/components/form/Button"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { PencilSquareIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { fetcher } from "@/app/utils/fetcher"

const UserPage = () => {
    const router = useRouter()
    const { data: user, error, isLoading } = useSWR<UserMeResponseInterface>("/api/users/me", fetcher)

    return(
        <div>
            {
                user &&
                
                <div className="flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row gap-10 justify-center">
                        <div className="flex flex-col justify-between">
                            <div className="header">
                                Hi, {user.name} {user.surname}
                            </div>
                            <div className="flex flex-col gap-1 my-4">
                                <div className="flex items-center gap-1">
                                    <PencilSquareIcon width={18} height={18}/>

                                    <p>Edit Profile</p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <LockClosedIcon width={18} height={18}/>

                                    <p>Change Password</p>
                                </div>
                            </div>
                            <div>
                                <Button title="Browse Groups" click={() => router.push("/groups")} loading={false}/>
                            </div>
                        </div>
                        <div>
                            <Image src="/img/ill.png" width={350} height={200} alt="Cook Photo"/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserPage