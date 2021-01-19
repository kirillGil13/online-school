import { IUser, UserResponseType } from './user.types';

export class User implements IUser {
    id: number;
    email: string;
    description: string;
    username: string;
    avatar: string;
    login: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
    activeSubscription: boolean;
    name: string;
    surname: string;
    constructor(data: UserResponseType) {
        this.id = data.id;
        this.email = data.email;
        this.description = data.description;
        this.username = data.username;
        this.avatar = data.avatar;
        this.login = data.login;
        this.vk = data.vk;
        this.facebook = data.facebook;
        this.instagram = data.instagram;
        this.skype = data.skype;
        this.activeSubscription = data.activeSubscription;
        this.name = data.name;
        this.surname = data.surname;
    }
    get link(): string {
        return 'https://partner.onelinks.com/' + this.login;
    }
    get initials(): string {
        return this.surname[0].toUpperCase() + this.name[0].toUpperCase();
    }
}
