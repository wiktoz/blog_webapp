import { useRouter } from "next/navigation"
import Button from "../form/Button"
import api from "@/app/utils/api"
import { useState } from "react"
import { KeyedMutator } from "swr"
import { CheckIcon } from "@heroicons/react/24/outline"

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
        <div className="flex flex-col md:flex-row justify-between rounded-xl p-8 md:items-center bg-[#fffbef] shadow gap-4">
            <div className="flex flex-col gap-1">
                <div className="text-xl font-bold">
                    {group.name}
                </div>
                <div>
                    {group.description}
                </div>
                {
                    isUserInGroup &&
                    <div className="flex items-center gap-0.5 text-gray-400 mt-2">
                        <CheckIcon width={14} height={14}/>
                        Joined
                    </div>
                }
            </div>
            <div>
                {
                    isUserInGroup ?
                    <>
                        <div>
                            <Button title={"Visit Group"} loading={false} click={() => router.push("/groups/" + group.group_id)} />
                        </div>
                    </>
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