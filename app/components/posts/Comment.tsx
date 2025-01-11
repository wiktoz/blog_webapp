import { UserCircleIcon } from "@heroicons/react/24/outline"
import { timeAgo } from "@/app/utils/helpers"

const Comment = ({comment}:{comment: CommentResponseInterface}) => {
    return(
        <div>
            <div className="flex flex-col rounded-lg p-4 gap-4">
                <div className="flex gap-1.5 items-center">
                    <div className=" rounded-full">
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
                <div>
                    {comment.content}
                </div>
            </div>
        </div>
    )
}

export default Comment