'use client'

import Post from "./Post"
import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"

const PostsList = ({groupId}:{groupId:string}) => {
    const { data: posts, error: postsError, isLoading: postsLoading } = useSWR<PostResponseInterface[]>("/api/groups/" + groupId + "/posts", fetcher)

    return(
        <div className="flex flex-col gap-4">
            {
                posts && posts.length > 0 &&
                posts.map(post => {
                    return(
                        <Post post={post} key={post.post_id}/>
                    )
                })
            }
        </div>
    )
}

export default PostsList