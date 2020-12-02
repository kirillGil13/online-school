export interface IUser {
    email: string,
    username: string,
    name: string,
    surname: string,
    vk?: string,
    facebook?: string,
    instagram?: string,
    skype?: string,
    activeSubscription: boolean,
    description?: string,
    avatar?: string,
    login: string,
}
export type UserResponseType = {
    user: IUser
}