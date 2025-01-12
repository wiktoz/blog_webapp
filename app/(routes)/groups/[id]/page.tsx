import GroupDetails from "@/app/components/groups/GroupDetails"
import PostsList from "@/app/components/posts/PostsList"
import PostUpload from "@/app/components/posts/PostUpload"

const GroupPage = async ({params}:{params: Promise<{id: string}>}) => {
    const id = (await params).id

    return(
        <div className="md:w-1/2 flex flex-col mx-auto gap-8">
            <GroupDetails groupId={id} />
            <PostUpload groupId={id} />

            <PostsList groupId={id} />
        </div>
    )
}

export default GroupPage