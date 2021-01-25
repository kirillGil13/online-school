import {Component} from 'vue-property-decorator';
import {email, maxLength, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import {IUser} from '@/entity/user';
import {ProfileContactDataFormRequestType} from '@/form/profile/contactData/ProfileContactDataForm.types';

@Component({
    validations: {
        email: {
            required,
            email: email()
        },
        vk: {
            maxLength: maxLength(30),
        },
        facebook: {
            maxLength: maxLength(30),
        },
        instagram: {
            maxLength: maxLength(30),
        },
        skype: {
            maxLength: maxLength(30),
        },
        username: {
            required,
        },
    },
})
export class ProfileContactDataForm extends Form {
    public email = '';
    public vk = '';
    public facebook = '';
    public instagram = '';
    public skype = '';
    public username = '';

    public serverErrors: { [key: string]: string[] } = {};

    public messages = {
        email: {
            required: 'Введите email',
            email: 'Введите корректный email',
        },
        vk: {
            maxLength: 'Ссылка на страницу vk не должна превышать 30 символов',
        },
        facebook: {
            maxLength: 'Ссылка на страницу facebook не должна превышать 30 символов',
        },
        instagram: {
            maxLength: 'Ссылка на страницу instagram не должна превышать 30 символов',
        },
        skype: {
            maxLength: 'Ссылка на страницу skype не должна превышать 30 символов',
        },
        username: {
            required: 'Введите номер телефона',
        },
    };
    setFormData(user: IUser): void {
        this.email = user.email;
        this.vk = user.vk;
        this.facebook = user.facebook;
        this.instagram = user.instagram;
        this.skype = user.skype;
        this.username = '+' + user.username;
    }
    getFormData(): ProfileContactDataFormRequestType {
        return {
            email: this.email,
            vk: this.vk,
            facebook: this.facebook,
            instagram: this.instagram,
            skype: this.skype,
        };
    }
    getFullPhone(): string {
        return '';
    }
}
