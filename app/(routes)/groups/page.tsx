'use client'

import useSWR from "swr"
import Spinner from "@/app/components/Spinner"
import GroupsList from "@/app/components/groups/GroupsList"
import { useRouter } from "next/navigation"
import { fetcher } from "@/app/utils/fetcher"
import { useState, useEffect } from "react"

const GroupsPage = () => {
    const { data: groups, error: groupsError, isLoading: groupsLoading } = useSWR<GroupResponseInterface[]>("/api/groups/list", fetcher)
    const { data: myGroups, error: myGroupsError, isLoading: myGroupsLoading } = useSWR<GroupResponseInterface[]>("/api/groups/my", fetcher)

    const [myGroupsIds, setMyGroupsIds] = useState<number[]>([])

    useEffect(() => {
      if(myGroups){
        const ids = myGroups.map((item) => item.group_id);
        setMyGroupsIds(ids)
      }
    }, [myGroups])

    return(
      <div className="w-1/2 flex flex-col mx-auto">
        <div className="font-bold text-lg">
          Groups
        </div>
        <div>
            {
              groupsError ?
              <div>Error</div>
              :

              groups &&
              <GroupsList groups={groups} userGroups={myGroupsIds}/>
            }
        </div>
      </div>
    )
}

export default GroupsPage
