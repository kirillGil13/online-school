import {ILeaderItem, LeaderItemResponseType} from '@/entity/leaderItem/leaderItem.types';

export default class LeaderItem implements ILeaderItem {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
    email: string;
    phoneNumber: string;
    description: string;
    vkLink: string;
    telegram: string;
    isEmailConfirmed: boolean;
    isLeader: boolean;
    instagramLink: string;
    facebookLink: string;
    siteLink: string;

    constructor(data: LeaderItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.lastName = data.lastName;
        this.photoLink = data.photoLink;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.description = data.description;
        this.vkLink = data.vk_link;
        this.telegram = data.telegram;
        this.isEmailConfirmed = data.is_email_confirmed;
        this.isLeader = data.isLeader;
        this.instagramLink = data.instagram_link;
        this.facebookLink = data.facebook_link;
        this.siteLink = data.site_link;
    }

    get fullName(): string {
        return this.name + ' ' + this.lastName;
    }
}
