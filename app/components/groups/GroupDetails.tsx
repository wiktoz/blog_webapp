'use client'

import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"
import Link from "next/link"

const GroupDetails = ({groupId}:{groupId:string}) => {
    const { data: group, error: groupError, isLoading: groupLoading } = useSWR<GroupResponseInterface>("/api/groups/" + groupId, fetcher)

    return(
        <div>
            {
                groupError ?
                <div>{groupError}</div>

                :

                group ?

                <div>
                    <div className="text-xs mb-4">
                    <Link href="/">Ania Gotuje</Link> - <Link href="/groups">Groups</Link> - <Link href={"/groups/" + group.group_id}>{group.name}</Link>
                    </div>
                    <div className="text-4xl font-black">
                        {group.name}
                    </div>
                    <div className="text-md mt-1">
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