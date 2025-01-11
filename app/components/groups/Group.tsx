import Button from "../form/Button"

const Group = ({group, isUserInGroup}:{group:GroupResponseInterface, isUserInGroup:boolean}) => {

    return(
        <div className="flex flex-row justify-between border border-gray-500 rounded-xl p-8 items-center">
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
                    <div>See</div>
                    :
                    <div>
                        <Button title={"Join"} loading={false} click={() => {}}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Group