import Group from "./Group"

const GroupsList = ({groups, userGroups}:{groups:GroupResponseInterface[], userGroups: number[]}) => {
    const isUserInGroup = (groupId:number, groupsList:number[]) => {
        return groupsList.includes(groupId)
    }

    return(
        <div className="flex flex-col gap-4">
            {
                groups && groups.length > 0 &&
                groups.map(group => {
                    return(
                        <Group group={group} isUserInGroup={isUserInGroup(group.group_id, userGroups)} key={group.group_id}/>
                    )
                })
            }
        </div>
    )
}

export default GroupsList