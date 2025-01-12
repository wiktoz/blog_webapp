'use client'

import { useState } from "react"
import FileUpload from "../form/FileUpload"
import Textarea from "../form/Textarea"
import Input from "../form/Input"
import Button from "../form/Button"
import api from "@/app/utils/api"
import { filesToBase64 } from "@/app/utils/helpers"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { PostUploadSchema } from "@/app/validation/post"
import { useSWRConfig } from "swr"

const PostUpload = ({groupId}:{groupId:string}) => {
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { mutate } = useSWRConfig()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PostUploadInterface>({ resolver: yupResolver(PostUploadSchema), defaultValues: {
        title: '',
        content: '', 
    }})

    const addPost = async (data:PostUploadInterface) => {
        setIsLoading(true)

        const base64Files = await filesToBase64(files)

        await api.post("/api/groups/" + groupId + "/posts", {
            title: data.title,
            content: data.content,
            photos: base64Files
        })
        .then(async () => {
            await mutate(() => true, undefined, { revalidate: true })
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            reset()
            setFiles([])
            setIsLoading(false)
        })
    }

    return(
        <div className="flex flex-col gap-4">
             <div className="font-black text-lg">
                Will you cook with us? 
            </div>
        
            <div className="bg-[#fffbef] rounded-lg shadow-md p-6 gap-4">
                <div className="font-black text-lg">
                    Share your fantastic recipe 
                </div>
                <div className="mb-6 text-gray-600 text-sm">
                    We are excited to see what you are cooking today! Share your recipe with the community and let's cook together!
                </div>
                <Input id="title" title="" placeholder="What are we cooking today?" register={register} errors={errors}/>
                <Textarea id="content" title="" description="Write your fantastic recipe here" register={register} errors={errors}/>
                <FileUpload files={files} setFiles={setFiles} multiple={true}/>
                <Button title="Share my recipe!" loading={isLoading} click={handleSubmit(addPost)}/>
            </div>
        </div>
    )
}

export default PostUpload