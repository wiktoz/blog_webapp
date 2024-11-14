'use client'

import { InputInterface } from "@/app/interfaces/form"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const Input = ({id, title, type, value, autoComplete, errors, register, setter}:InputInterface) => {
    const [currentValue, setCurrentValue] = useState(value ? value : "")

    return (
        <div className="max-w-100">
            <label htmlFor={id} className="block text-xs font-medium px-1">
                {title}
            </label>
            <input
                { ...register ? register(id) : ""}
                type={type ? type : "text"}
                id={id}
                name={id}
                autoComplete={autoComplete ? autoComplete : "off"}
                value={currentValue}
                onChange={ e => {
                    setCurrentValue(e.target.value)
                    if(setter) setter(e.target.value)
                }}
                className={"w-full my-1 p-2 border border-gray-900 px-3 text-gray-900 text-sm rounded-lg bg-transparent " +
                    "focus:outline-none focus:border focus:border-gray-800 block ring-0 focus:ring-0 " +
                    (errors ? errors[id] ? "border-red-600" : "" : "")}
            />
            { 
            errors && errors[id]?.message &&
                <div className="text-red-600 text-xs text-right flex justify-end items-center gap-0.5">
                    <ExclamationCircleIcon width={18} height={18}/>
                    { errors[id]?.message }
                </div>
            }
        </div>
    )
}

export default Input