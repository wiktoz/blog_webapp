'use client'

import GroupsList from "@/app/components/groups/GroupsList"
import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"
import { useState } from "react"

const GroupsPage = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("")
  const { data: groups, error: groupsError, isLoading: groupsLoading } = useSWR<GroupResponseInterface[]>(searchPhrase ? "/api/groups/search/" + searchPhrase : "/api/groups/list", fetcher)

    return(
      <div className="md:w-1/2 flex flex-col mx-auto gap-6">
        <div className="font-bold text-2xl">
          Groups
        </div>
        <div>
          <input
            className="w-full bg-[#fffbef] shadow rounded-lg p-2 px-4 focus:ring-2 focus:ring-[#f87b4a] focus:outline-none font-normal"
            placeholder="Search for group..."
            onChange={(e) => setSearchPhrase(e.target.value)}
            value={searchPhrase}
          />
        </div>
        <div>
            {
              groups &&
              <GroupsList groups={groups}/>
            }
        </div>
      </div>
    )
}

export default GroupsPage
