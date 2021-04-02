export interface IUser {
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
    isLeader: boolean;
    isEmailConfirmed: boolean;
    vkLink: string;
    facebookLink: string;
    instagramLink: string;
    skype: string;
    description: string;
    photoLink: string;
    initials: string;
    fullName: string;
}

export type UserResponseType = {
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
    isLeader: boolean;
    is_email_confirmed: boolean;
    vk_link: string;
    facebook_link: string;
    instagram_link: string;
    skype: string;
    description: string;
    photoLink: string;
};

export type UserUpdateRequestType = {
    name?: string;
    lastName?: string;
    shortPhotoLink?: string;
    description?: string;
    skype?: string;
    vk_link?: string;
    instagram_link?: string;
    facebook_link?: string;
}

