import {IUser, UserRequestType, UserResponseType} from './user.types';

export class User implements IUser {
    id: number;
    email: string;
    phoneNumber: string;
    name: string;
    lastName: string;
    isLeader: boolean;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
    activeSubscription: boolean;
    description: string;
    photoLink: string;
    login?: string;
    isEmailConfirmed: boolean;

    constructor(data: UserResponseType) {
        this.id = data.id;
        this.email = data.email;
        this.description = data.description!;
        this.phoneNumber = data.phoneNumber;
        this.photoLink = data.photoLink;
        this.login = data.login;
        this.vk = data.vk!;
        this.facebook = data.facebook!;
        this.instagram = data.instagram!;
        this.skype = data.skype!;
        this.activeSubscription = data.activeSubscription!;
        this.name = data.name;
        this.lastName = data.lastName;
        this.isLeader = data.isLeader;
        this.isEmailConfirmed = data.is_email_confirmed;
    }

    get link(): string {
        return 'https://partner.onelinks.com/' + this.login;
    }

    get initials(): string {
        return this.lastName[0].toUpperCase() + this.name[0].toUpperCase();
    }
    get fullName(): string {
        return this.lastName + ' ' + this.name;
    }

    getRequestData(): UserRequestType {
        return {
            name: this.name,
            lastName: this.lastName,
            login: this.login!,
            email: this.email,
            vk: this.vk,
            facebook: this.facebook,
            instagram: this.instagram,
            skype: this.skype,
            description: this.description
        }
    }

}
