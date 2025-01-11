'use client'

import GroupsList from "@/app/components/groups/GroupsList"

const GroupsPage = () => {

    return(
      <div className="w-1/2 flex flex-col mx-auto gap-6">
        <div className="font-bold text-2xl">
          Groups
        </div>
        <div>
            {
              <GroupsList/>
            }
        </div>
      </div>
    )
}

export default GroupsPage
