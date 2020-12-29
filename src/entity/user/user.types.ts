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
