import {UseFormRegister, UseFormSetValue} from "react-hook-form"

interface InputInterface {
    id: string,
    title: string,
    type?: string,
    value?: string,
    autoComplete?: string,
    placeholder?: string,
    errors?: { [key: string]: { message?: string } },
    register?: UseFormRegister<>,
    setter?: (value: string) => void,
    setValue?: UseFormSetValue<>
}

interface ButtonInterface {
    title: string,
    loading: boolean,
    click: () => void,
}