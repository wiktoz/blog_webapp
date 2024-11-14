import { object, string, ref, ObjectSchema } from 'yup'

const SignUpSchema: ObjectSchema<SignUpInterface> = object().shape({
    name: string().required("name is required"),
    surname: string()
            .required("surname is required"),
    email:  string()
            .email("e-mail is not valid")
            .required("e-mail is required"),
    password: string().required("password is required")
            .min(8, "password is too short").max(64, "password is too long"),
    confirmPassword: string().required("confirm password is required")
            .min(8, "password is too short").max(64, "password is too long")
            .oneOf([ref('password')], 'passwords must match')
})

const SignInSchema: ObjectSchema<SignInInterface> = object().shape({
    email:  string()
            .email("e-mail is not valid")
            .required("e-mail is required"),
    password: string().required("password is required")
            .min(8, "password is too short").max(64, "password is too long")
})

export { SignUpSchema, SignInSchema }
