'use client'

import Input from "@/app/components/form/Input"
import Button from "@/app/components/form/Button"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SignInSchema } from "@/app/validation/auth"
import { useState } from 'react'

const SignIn = () => {
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

        console.log(res.status)

        const resData = await res.json()

        console.log(resData)

        setError("password", { type: 'custom', message: resData.message })

        setLoading(false)
    }

    return (
        <div className="flex w-1/3 flex-col mx-auto">
            <div className="header mb-1">
                Sign In
            </div>
            <div className="text-secondary text-xs mb-4 flex w-2/3">
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