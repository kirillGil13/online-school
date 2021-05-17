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
    telegram: string;
    description: string;
    photoLink: string;
    initials: string;
    fullName: string;
    siteLink: string;
    subscription: IUserSubscription;
}

export interface IUserSubscription {
    isActual: boolean;
    createdAt: string;
    expiresAt: string;
    freePeriodExpire: string;
    sum: number;
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
    telegram: string;
    description: string;
    photoLink: string;
    site_link: string;
    subscription: UserSubscriptionResponseType;
};
 export type UserSubscriptionResponseType = {
     is_actual: boolean;
     created_at: number;
     expires_at: number | null;
 }

export type UserUpdateRequestType = {
    name?: string;
    lastName?: string;
    shortPhotoLink?: string;
    description?: string;
    telegram?: string;
    vk_link?: string;
    instagram_link?: string;
    facebook_link?: string;
    site_link?: string;
}

