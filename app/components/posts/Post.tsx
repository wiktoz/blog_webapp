import { fetcher } from "@/app/utils/fetcher"
import { timeAgo } from "@/app/utils/helpers"
import { UserCircleIcon, ChatBubbleOvalLeftIcon, TrashIcon, CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import useSWR from "swr"
import Comment from "./Comment"
import { AnimatePresence, motion } from "framer-motion"
import Carousel from "../Carousel"
import Input from "../form/Input"
import { useUser } from "@/app/context/UserContext"
import api from "@/app/utils/api"
import { useSWRConfig } from "swr"
import StarWrapper from "./StarWrapper"
import Spinner from "../Spinner"

const Post = ({post}:{post:PostResponseInterface}) => {
    const [commentsOpen, setCommentsOpen] = useState<boolean>(false)
    const [postDeleted, setPostDeleted] = useState<boolean>(false)
    const [comment, setComment] = useState<string>("")

    const { user } = useUser()

    const { data: comments, error, isLoading, mutate: commentsMutate } = useSWR<CommentResponseInterface[]>(commentsOpen ? "/api/posts/" + post.post_id + "/commentsName" : null, fetcher)
    const { data: rating, error: ratingError, isLoading: ratingLoading, mutate } = useSWR<RatingInterface>("/api/posts/" + post.post_id + "/rate", fetcher)

    const deletePost = async () => {
        await api.delete("/api/posts/" + post.post_id)
        .then(() => {
            setPostDeleted(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const setRating = async (rate:number) => {
        await api.post("/api/posts/" + post.post_id + "/rate", {value: rate})
        .then(() => {
            mutate()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addComment = async () => {
        if(comment === "") return
        
        await api.post("/api/posts/" + post.post_id + "/comments", {content: comment})
        .then(() => {
            commentsMutate()
            setComment("")
        })
        .catch(err => {
            console.log(err)
        })
    }

    if(postDeleted) return(
        <div className="flex flex-row rounded-lg shadow-md p-6 gap-2 bg-[#fffbef] items-center text-lg justify-center justify-content-center">
            <CheckCircleIcon width={24} height={24} className="text-green-500"/>
            Post Successfully Deleted
        </div>
    )

    return(
        <div className="">
            <div className="flex flex-col rounded-lg shadow-md p-6 gap-4 bg-[#fffbef]">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex gap-2 items-center w-fit">
                        <div className="bg-secondary rounded-full">
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
                        {
                            ratingLoading ?
                            <Spinner/>
                            :

                            ratingError ?
                            <div className="flex flex-row items-center gap-1">
                                <p className="font-semibold text-md">{ratingError.message}</p>
                                <StarWrapper id={post.post_id} rating={Math.round(0)} ratingSetter={setRating}/>
                            </div>

                            :

                            rating &&
                            <div className="flex flex-row items-center gap-1">
                                <p className="font-semibold text-lg">{Math.round(rating.average * 100) / 100}</p>
                                <StarWrapper id={post.post_id} rating={Math.round(rating.average)} ratingSetter={setRating}/>
                            </div>
                            
                        }
                    </div>
                </div>
                {
                    user && post.user === (user.name + " " + user.surname) &&
                    <div onClick={() => deletePost()} className="cursor-pointer flex flex-row items-center gap-1 justify-content-end ml-auto">
                        <TrashIcon width={20} height={20} strokeWidth={1} />
                        <p className="font-semibold">Remove Post</p>
                    </div>
                }
                <div className="my-2">
                    <div className="mb-4">
                        
                        <p className="font-semibold text-lg">{post.title}</p>
                        <p>{post.content}</p>
                    </div>
                    {
                        post.photos.length > 0 &&
                        <Carousel items={post.photos.map(photo => `data:image/jpeg;base64,${photo}`)}/>
                    }
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
                                comments && comments.length > 0 ? comments.map(comment => {
                                    return(
                                        <Comment comment={comment} key={comment.comment_id}/>
                                    )
                                })
                                :
                                <p className="p-4">No comments yet, be the first to write one!</p>
                            }
                        </motion.div>
                    }
                    </AnimatePresence>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="grow">
                        <Input id={"comment"} title={""} placeholder="Write a comment..." setter={setComment} value={comment}/>
                    </div>
                    
                    <div className="bg-secondary text-white rounded-full p-2 cursor-pointer" onClick={() => addComment()}>
                        <PaperAirplaneIcon width={20} height={20}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post