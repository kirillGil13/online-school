export interface IUserModule {
    email: string,
    username: string,
    bio?: string,
    image?: string,
    token: string,

}
export type UserResponseType = {
    user: IUserModule
}