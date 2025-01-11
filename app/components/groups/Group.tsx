import { useRouter } from "next/navigation"
import Button from "../form/Button"
import api from "@/app/utils/api"
import { useState } from "react"
import { KeyedMutator } from "swr"

const Group = ({group, isUserInGroup, mutate}:{group:GroupResponseInterface, isUserInGroup:boolean, mutate: KeyedMutator<GroupResponseInterface[]>}) => {
    const router = useRouter()

    const [joinLoading, setJoinLoading] = useState<boolean>(false)

    const joinGroup = async (groupId:number) => {
        setJoinLoading(true)

        await api.get("/api/groups/" + String(groupId) + "/join")
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(async () => {
            await mutate()
            setJoinLoading(false)
        })
    }

    return(
        <div className="flex flex-row justify-between rounded-xl p-8 items-center bg-[#fffbef] shadow">
            <div className="flex flex-col">
                <div className="text-xl font-bold">
                    {group.name}
                </div>
                <div>
                    {group.description}
                </div>
            </div>
            <div>
                {
                    isUserInGroup ?
                    <div onClick={() => router.push("/groups/" + group.group_id)} className="cursor-pointer">
                        See
                    </div>
                    :
                    <div>
                        <Button title={"Join"} loading={joinLoading} click={() => joinGroup(group.group_id)}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Group