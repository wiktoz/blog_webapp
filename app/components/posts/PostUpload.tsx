'use client'

import { useState } from "react"
import FileUpload from "../form/FileUpload"

const PostUpload = () => {
    const [files, setFiles] = useState<File[]>([])

    return(
        <div>
            <div>
                Add Post
            </div>
            <FileUpload files={files} setFiles={setFiles} multiple={true}/>
        </div>
    )
}

export default PostUpload