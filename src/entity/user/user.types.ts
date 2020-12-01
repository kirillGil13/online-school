export interface IUser {
    email: string,
    username: string,
    bio?: string,
    image?: string,
    token: string,
}
export type UserResponseType = {
    user: IUser
}