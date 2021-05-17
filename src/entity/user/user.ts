import {IUser, IUserSubscription, UserResponseType} from './user.types';

export class User implements IUser {
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
    isLeader: boolean;
    vkLink: string;
    facebookLink: string;
    instagramLink: string;
    telegram: string;
    description: string;
    photoLink: string;
    isEmailConfirmed: boolean;
    siteLink: string;
    subscription: IUserSubscription;

    constructor(data: UserResponseType) {
        this.id = data.id;
        this.email = data.email;
        this.description = data.description;
        this.phoneNumber = data.phoneNumber;
        this.photoLink = data.photoLink;
        this.vkLink = data.vk_link;
        this.facebookLink = data.facebook_link;
        this.instagramLink = data.instagram_link;
        this.telegram = data.telegram;
        this.name = data.name;
        this.lastName = data.lastName;
        this.isLeader = data.isLeader;
        this.isEmailConfirmed = data.is_email_confirmed;
        this.siteLink = data.site_link;
        this.subscription = {
            isActual: data.subscription.is_actual,
            expiresAt: this.getTime(data.subscription.expires_at),
            createdAt: this.getTime(data.subscription.created_at),
            freePeriodExpire: this.getTime(data.subscription.created_at + 604800),
            sum: 390
        };
    }

    get initials(): string {
        return this.lastName[0].toUpperCase() + this.name[0].toUpperCase();
    }

    get fullName(): string {
        return this.lastName + ' ' + this.name;
    }

    getTime(createdAt: number | null): string {
        if (createdAt) {
            const date = new Date(createdAt * 1000);
            return date.toLocaleString().slice(0, 10);
        } else {
            return '';
        }
    }

}
