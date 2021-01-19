import {required, email, maxLength, minLength} from '@rxweb/reactive-forms';

import {IUser} from '@/entity/user';

export class ProfileContactDataForm implements IUser {
    name: string;
    surname: string;
    id: number;
    referLink?: string;
    description: string;
    @required()
    @email({
        message: 'Введите корректную почту'
    })
    email: string;
    @required()
    @maxLength({
        value: 12,
        message: 'Введите корректный номер',
    })
    @minLength({
        value: 12,
        message: 'Введите корректный номер',
    })
    username: string;
    @maxLength({
        value: 30,
        message: 'Ссылка на страницу vk не должна превышать 30 символов',
    })
    vk: string;
    @maxLength({
        value: 30,
        message: 'Ссылка на страницу facebook не должна превышать 30 символов',
    })
    facebook: string;
    @maxLength({
        value: 30,
        message: 'Ссылка на страницу instagram не должна превышать 30 символов',
    })
    instagram: string;
    @maxLength({
        value: 30,
        message: 'Ссылка на страницу skype не должна превышать 30 символов',
    })
    skype: string;
    activeSubscription: boolean;
    avatar: string;
    login: string;
    initials!: string;
    link!: string;
    constructor(data: IUser) {
        this.name = data.name;
        this.surname = data.surname;
        this.id = data.id;
        this.referLink = data.referLink;
        this.description = data.description;
        this.email = data.email;
        this.username = '+' + data.username;
        this.vk = data.vk;
        this.instagram = data.instagram;
        this.skype = data.skype;
        this.activeSubscription = data.activeSubscription;
        this.avatar = data.avatar;
        this.login = data.login;
        this.facebook = data.facebook;
    }
}
