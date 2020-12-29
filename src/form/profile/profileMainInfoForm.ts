import { maxLength, required } from '@rxweb/reactive-forms';

import {IUser} from '@/entity/user';

export class ProfileMainInfoForm implements IUser {
    @required()
    @maxLength({
        value: 30,
        message: 'Длинна имени не должна превышать 30 символов',
    })
    name: string;
    @required()
    @maxLength({
        value: 30,
        message: 'Длинна фамилии не должна превышать 30 символов',
    })
    surname: string;
    id: number;
    referLink?: string;
    @maxLength({
        value: 50,
        message: 'Длинна описания не должна превышать 50 символов',
    })
    description: string;
    email: string;
    username: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
    activeSubscription: boolean;
    avatar: string;
    login: string;
    constructor({
        name,
        surname,
        id,
        referLink,
        description,
        email,
        username,
        vk,
        instagram,
        skype,
        activeSubscription,
        avatar,
        login,
        facebook
    }: IUser) {
        this.name = name;
        this.surname = surname;
        this.id = id;
        this.referLink = referLink;
        this.description = description;
        this.email = email;
        this.username = username;
        this.vk = vk;
        this.instagram = instagram;
        this.skype = skype;
        this.activeSubscription =activeSubscription;
        this.avatar = avatar;
        this.login = login;
        this.facebook = facebook;
    }
}
