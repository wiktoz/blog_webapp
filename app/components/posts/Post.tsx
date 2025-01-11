import { fetcher } from "@/app/utils/fetcher"
import { timeAgo } from "@/app/utils/helpers"
import { UserCircleIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import useSWR from "swr"
import Comment from "./Comment"
import { AnimatePresence, motion } from "framer-motion"

const Post = ({post}:{post:PostResponseInterface}) => {
    const [commentsOpen, setCommentsOpen] = useState<boolean>(false)

    const { data: comments, error, isLoading } = useSWR<CommentResponseInterface[]>(commentsOpen ? "/api/posts/" + post.post_id + "/commentsName" : null, fetcher)

    return(
        <div className="">
            <div className="flex flex-col rounded-lg shadow-md p-6 gap-4 bg-[#fffbef]">
                <div className="flex gap-1.5 items-center w-fit">
                    <div className=" rounded-full">
                        <UserCircleIcon width={36} height={36} strokeWidth={1}/>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-md font-semibold">
                            {post.user}
                        </div>
                        <div className="text-sm text-gray-600">
                            {timeAgo(post.created_at)}
                        </div>
                    </div>
                </div>
                <div>
                    {post.content}
                </div>
                <div>
                    <div onClick={() => setCommentsOpen(!commentsOpen)}
                    className={"flex flex-row items-center gap-0.5 bg-secondary w-fit py-2 px-6 font-semibold justify-self-end mt-3 cursor-pointer rounded-lg transition " + (commentsOpen && "rounded-b-none")}>
                        <ChatBubbleOvalLeftIcon width={18} height={18} strokeWidth={1.5}/>
                        Comments ({post.comments.length})
                    </div>
                    <AnimatePresence>
                    {
                        commentsOpen &&
                        <motion.div
                            key={"comments-section-" + post.post_id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeIn" }} 
                            className="border border-[#f87b4a] rounded-b-lg rounded-tr-lg overflow-hidden">
                            {
                                comments && comments.map(comment => {
                                    return(
                                        <Comment comment={comment} key={comment.comment_id}/>
                                    )
                                })
                            }
                        </motion.div>
                    }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Post