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

export interface IMainMenu {
    title: string,
    iconName: string,
    path: string,
    subMenu?: IMainMenu
}

export interface IFakeUserInfo {
    name: string,
    surname: string,
    login: string,
    avatar: string
}