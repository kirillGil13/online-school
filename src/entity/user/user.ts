import {IUser, UserResponseType} from './user.types';

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
    skype: string;
    description: string;
    photoLink: string;
    isEmailConfirmed: boolean;

    constructor(data: UserResponseType) {
        this.id = data.id;
        this.email = data.email;
        this.description = data.description;
        this.phoneNumber = data.phoneNumber;
        this.photoLink = data.photoLink;
        this.vkLink = data.vk_link;
        this.facebookLink = data.facebook_link;
        this.instagramLink = data.instagram_link;
        this.skype = data.skype;
        this.name = data.name;
        this.lastName = data.lastName;
        this.isLeader = data.isLeader;
        this.isEmailConfirmed = data.is_email_confirmed;
    }

    get initials(): string {
        return this.lastName[0].toUpperCase() + this.name[0].toUpperCase();
    }
    get fullName(): string {
        return this.lastName + ' ' + this.name;
    }

}
