export interface IUser {
    email: string,
    username: string,
    bio?: string,
    image?: string,
    token: string,
}
export interface RootState {
    version: string;
}
