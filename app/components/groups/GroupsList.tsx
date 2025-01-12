import Group from "./Group"
import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"
import { useEffect, useState } from "react"

const GroupsList = ({groups}:{groups:GroupResponseInterface[]}) => {
    const { data: myGroups, error: myGroupsError, isLoading: myGroupsLoading, mutate } = useSWR<GroupResponseInterface[]>("/api/groups/my", fetcher)

    const [myGroupsIds, setMyGroupsIds] = useState<number[]>([])

    useEffect(() => {
      if(myGroups){
        const ids = myGroups.map((item) => item.group_id);
        setMyGroupsIds(ids)
      }
    }, [myGroups])

    const isUserInGroup = (groupId:number) => {
        return myGroupsIds.includes(groupId)
    }

    return(
        <div className="flex flex-col gap-4">
            {
                groups && groups.length > 0 &&
                groups.map(group => {
                    return(
                        <Group group={group} isUserInGroup={isUserInGroup(group.group_id)} key={group.group_id} mutate={mutate}/>
                    )
                })
            }
        </div>
    )
}

export default GroupsList