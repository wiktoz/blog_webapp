import {Dispatch, SetStateAction, useState} from "react";
import {UseFormRegister} from "react-hook-form";

interface TextareaInterface {
    id: string,
    title: string,
    description?: string,
    rows?: number,
    value?: string,
    errors?: { [key: string]: { message?: string } },
    register?: UseFormRegister<any>
    setter?: Dispatch<SetStateAction<string>>
}

export default function Textarea({id, title, description, rows, value, register, errors, setter}:TextareaInterface){
    const [currentValue, setCurrentValue] = useState<string>(value || "")

    return(
        <div className="col-span-12 py-2">
            <label htmlFor={id} className="block text-xs text-gray-700 px-1">
                {title}
            </label>
            <div className="mt-1">
                <textarea
                    {...register ? register(id) : ""}
                    id={id}
                    name={id}
                    rows={rows ? rows : 3}
                    placeholder={description}
                    value={currentValue}
                    onChange={e => {
                        setCurrentValue(e.target.value)
                        if (setter) setter(e.target.value)
                    }}
                    className={"w-full my-1 p-2 shadow px-3 text-gray-900 text-sm rounded-lg bg-primary " +
                    "focus:outline-none focus:ring-2 focus:ring-[#f87b4a] block min-h-4 " +
                        (errors ? errors[id] ? "border-red-600" : "border-gray-300" : "border-gray-300")}
                />
                <div className="text-red-600 text-xs">{errors ? errors[id]?.message : ""}</div>
            </div>
        </div>
    )
}