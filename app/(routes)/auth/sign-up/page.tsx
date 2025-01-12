'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SignUpSchema } from "@/app/validation/auth"
import Input from "@/app/components/form/Input"
import Button from "@/app/components/form/Button"

const SignUp = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<SignUpInterface>({ resolver: yupResolver(SignUpSchema) })

    const [loading, setLoading] = useState<boolean>(false)

    const submit = async (data:SignUpInterface) => {
        setLoading(true)

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const resData = await res.json()

        if(res.status === 200) {
            return router.push("/auth/sign-in")
        }

        setError("password", { type: 'custom', message: resData.message })

        setLoading(false)
    }

    return (
        <div className="flex md:w-1/3 flex-col rounded-lg shadow-md p-6 py-10 gap-2 bg-[#fffbef] mx-auto">
            <div className="text-2xl font-bold">
                Sign Up
            </div>
            <div className="text-secondary text-xs mb-4 flex w-2/3">
                Join our community and get access to thousends of recipes from cuisines from all over the world!
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col gap-1">
                    <Input 
                        id={"name"}
                        title={"name"}
                        register={register}
                        errors={errors}
                    />
                    <Input 
                        id={"surname"}
                        title={"surname"}
                        register={register}
                        errors={errors}
                    />
                    <div className="h-px w-full bg-gray-300 rounded-full my-5"></div>
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
                    <Input 
                        id={"confirmPassword"}
                        title={"confirm password"}
                        type={"password"}
                        register={register}
                        errors={errors}
                    />
                    <Button 
                        title={"Sign Up"} 
                        click={handleSubmit(submit)} 
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default SignUp