export interface IUser {
    id: number;
    email: string;
    username: string;
    name: string;
    surname: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
    activeSubscription: boolean;
    description: string;
    avatar: string;
    login: string;
    link: string;
    initials: string;
    referLink?: string;
    getRequestData(): UserRequestType;
}

export type UserResponseType = {
    id: number;
    email: string;
    username: string;
    name: string;
    surname: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
    activeSubscription: boolean;
    description: string;
    avatar: string;
    login: string;
};
export type UserRequestType = {
    name: string;
    surname: string;
    login: string;
    email: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
    description: string;
}
