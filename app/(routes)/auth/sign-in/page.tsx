'use client'

import Input from "@/app/components/form/Input"
import Button from "@/app/components/form/Button"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SignInSchema } from "@/app/validation/auth"
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { useSWRConfig } from "swr"

const SignIn = () => {
    const router = useRouter()

    const { mutate } = useSWRConfig()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<SignInInterface>({ resolver: yupResolver(SignInSchema) })

    const [loading, setLoading] = useState<boolean>(false)

    const submit = async (data:SignInInterface) => {
        setLoading(true)

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const resData = await res.json()

        if(res.status === 200) {
            await mutate(() => true, undefined, { revalidate: true })
            return router.push("/user/profile")
        }

        setError("password", { type: 'custom', message: resData.message })

        setLoading(false)
    }

    return (
        <div className="flex md:w-1/3 flex-col rounded-lg shadow-md p-6 py-10 gap-2 bg-[#fffbef] mx-auto">
            <div className="text-2xl font-bold">
                Sign In
            </div>
            <div className="text-secondary text-xs mb-6 flex w-2/3">
                Discover all the recipes in one click
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col gap-1">
                    <Input 
                        id={"email"}
                        title={"email"}
                        register={register}
                        errors={errors}
                    />
                    <Input 
                        id={"password"}
                        title={"password"}
                        type={"password"}
                        register={register}
                        errors={errors}
                    />
                    <Button 
                        title={"Sign In"} 
                        click={handleSubmit(submit)} 
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default SignIn