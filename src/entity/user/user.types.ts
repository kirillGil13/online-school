export interface IUser {
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
    vk?: string;
    facebook?: string;
    instagram?: string;
    skype?: string;
    activeSubscription?: boolean;
    description?: string;
    photoLink: string;
    login?: string;
    link: string;
    initials: string;
    referLink?: string;
    fullName: string;
    getRequestData(): UserRequestType;
}

export type UserResponseType = {
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
    vk?: string;
    facebook?: string;
    instagram?: string;
    skype?: string;
    activeSubscription?: boolean;
    description?: string;
    photoLink: string;
    login?: string;
};
export type UserRequestType = {
    name: string;
    lastName: string;
    login: string;
    email: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
    description: string;
}
export type UserUpdateRequestType = {
    name?: string;
    lastName?: string;
    shortPhotoLink?: string;
}
