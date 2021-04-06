export interface ILeaderItem {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    description: string;
    vkLink: string;
    telegram: string;
    isEmailConfirmed: boolean;
    isLeader: boolean;
    instagramLink: string;
    facebookLink: string;
}
export type LeaderItemResponseType = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    photoLink: string;
    description: string;
    vk_link: string;
    telegram: string;
    is_email_confirmed: boolean;
    isLeader: boolean;
    instagram_link: string;
    facebook_link: string;
}
