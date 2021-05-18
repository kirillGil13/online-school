import {SubTypeName} from '@/entity/common/sub.types';

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
    subType(type: string): boolean | null;
}

export interface IUserSubscription {
    isActual: boolean | null;
    expiresAt: string | null;
    isTestPeriod: boolean | null;
    isTestPeriodAvailable: boolean;
    subType: string | null;
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
     is_actual: boolean | null;
     expires_at: number | null;
     is_test_period: boolean | null;
     is_test_period_available: boolean;
     sub_type: string | null;
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

