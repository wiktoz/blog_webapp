'use client'

import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"

const GroupDetails = ({groupId}:{groupId:string}) => {
    const { data: group, error: groupError, isLoading: groupLoading } = useSWR<GroupResponseInterface>("/api/groups/" + groupId, fetcher)

    return(
        <div>
            {
                groupError ?
                <div>{groupError}</div>

                :

                group ?

                <div className="mb-6">
                    <div className="text-2xl font-bold">
                        {group.name}
                    </div>
                    <div>
                        {group.description}
                    </div>
                </div>

                :

                <div>Invalid group ID</div>
            }
        </div>
    )
}

export default GroupDetails