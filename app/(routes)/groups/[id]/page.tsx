import GroupDetails from "@/app/components/groups/GroupDetails"
import PostsList from "@/app/components/posts/PostsList"

const GroupPage = async ({params}:{params: Promise<{id: string}>}) => {
    const id = (await params).id

    return(
        <div className="w-1/2 flex flex-col mx-auto gap-6">
            <GroupDetails groupId={id} />
            <PostsList groupId={id} />
        </div>
    )
}

export default GroupPage