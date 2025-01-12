import { UserCircleIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { timeAgo } from "@/app/utils/helpers"
import api from "@/app/utils/api"
import { useState } from "react"
import { useUser } from "@/app/context/UserContext"

const Comment = ({comment}:{comment: CommentResponseInterface}) => {
    const [commentDeleted, setCommentDeleted] = useState<boolean>(false)

    const { user } = useUser()

    const deleteComment = async () => {
        await api.delete("/api/posts/" + comment.post_id + "/comments", { 
            data: { comment_id: comment.comment_id }, 
            headers: {"Content-Type": "application/json"} 
        })
        .then(() => {
            setCommentDeleted(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    if(commentDeleted) return(
        <div className="flex flex-row rounded-lg shadow-md p-6 gap-2 bg-[#fffbef] items-center text-sm justify-center justify-content-center">
            <CheckCircleIcon width={16} height={16} className="text-green-500"/>
            Comment Successfully Deleted
        </div>
    )

    return(
        <div>
            <div className="flex flex-col rounded-lg p-4 gap-4">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex gap-1.5 items-center">
                        <div className="rounded-full">
                            <UserCircleIcon width={36} height={36} strokeWidth={1}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-md font-semibold">
                                {comment.username}
                            </div>
                            <div className="text-sm text-gray-600">
                                {timeAgo(comment.created_at)}
                            </div>
                        </div>
                    </div>
                    {
                        user && comment.user_id === user.user_id &&
                        <div>
                            <TrashIcon width={16} height={16} className="cursor-pointer" onClick={() => deleteComment()}/>
                        </div>
                    }
                </div>
                
                <div className="mx-2">
                    {comment.content}
                </div>
            </div>
        </div>
    )
}

export default Comment