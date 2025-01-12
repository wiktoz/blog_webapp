'use client'

import Post from "./Post"
import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"

const PostsList = ({groupId}:{groupId:string}) => {
    const { data: posts, error: postsError, isLoading: postsLoading } = useSWR<PostResponseInterface[]>("/api/groups/" + groupId + "/posts", fetcher)

    return(
        <div className="flex flex-col gap-4">
            <div className="font-black text-xl">
                Let's see what's cooking in the group
            </div>
            {
                posts && posts.length > 0 ?
                posts.map(post => {
                    return(
                        <Post post={post} key={post.post_id}/>
                    )
                })
                :
                <div className="flex flex-col rounded-lg shadow-md p-6 gap-2 bg-[#fffbef] items-center text-lg justify-center justify-content-center font-bold">
                    No posts yet 😔 
                    <p className="text-xs font-thin">Be the first to write one!</p>
                </div>
            }
        </div>
    )
}

export default PostsList