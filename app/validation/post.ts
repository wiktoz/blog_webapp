import { object, string, ref, ObjectSchema } from 'yup'

const PostUploadSchema: ObjectSchema<PostUploadInterface> = object().shape({
    title: string().required("title is required"),
    content: string().required("content is required"),
})

export { PostUploadSchema }
