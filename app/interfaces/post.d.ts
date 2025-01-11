interface PostResponseInterface {
    content: string,
    created_at: string,
    group_id: number,
    photos: string[],
    post_id: number,
    title: string,
    updated_at: string,
    user: string,
    comments: number[],
    notifications: number[],
    ratings: number[]
}

interface CommentResponseInterface {
    comment_id: number,
    content: string,
    created_at: string,
    post_id: number,
    user_id: string,
    username?: string
}