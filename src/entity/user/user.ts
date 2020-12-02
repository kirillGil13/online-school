import { IUser, UserResponseType } from './user.types';

export default class User implements IUser{
    email: string;
    description: string | undefined;
    username!: string;
    avatar: string | undefined;
    login!: string;
    vk: string | undefined;
    facebook: string | undefined;
    instagram: string | undefined;
    skype: string | undefined;
    activeSubscription!: boolean;
    name!: string;
    surname!: string;
    constructor(data: UserResponseType){
        this.email = data.user.email;
        this.description = data.user.description;
        this.username = data.user.username;
        this.avatar = data.user.avatar;
        this.login = data.user.login;
        this.vk = data.user.vk;
        this.facebook = data.user.facebook;
        this.instagram = data.user.instagram;
        this.skype = data.user.skype;
        this.activeSubscription = data.user.activeSubscription;
        this.name = data.user.name;
        this.surname = data.user.surname;
    }
}