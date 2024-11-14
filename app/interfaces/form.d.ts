import {UseFormRegister, UseFormSetValue} from "react-hook-form"

interface InputInterface {
    id: string,
    title: string,
    type?: string,
    value?: string,
    autoComplete?: string,
    errors?: { [key: string]: { message?: string } },
    register?: UseFormRegister<any>,
    setter?: (value: string) => void,
    setValue?: UseFormSetValue<any>
}

interface ButtonInterface {
    title: string,
    loading: boolean,
    click: () => void,
}