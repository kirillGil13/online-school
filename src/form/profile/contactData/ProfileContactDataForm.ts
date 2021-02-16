import {Component} from 'vue-property-decorator';
import {email, maxLength, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import {IUser} from '@/entity/user';
import {ProfileContactDataRequestType} from '@/form/profile/contactData/ProfileContactDataForm.types';
import {Validate} from '@/plugins/Vuelidate/Decorators';

@Component
export class ProfileContactDataForm extends Form {

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(maxLength(30), 'Ссылка на страницу vk не должна превышать 30 символов')
    public vk = '';

    @Validate(maxLength(30), 'Ссылка на страницу facebook не должна превышать 30 символов')
    public facebook = '';

    @Validate(maxLength(30), 'Ссылка на страницу instagram не должна превышать 30 символов')
    public instagram = '';

    @Validate(maxLength(30), 'Ссылка на страницу skype не должна превышать 30 символов')
    public skype = '';

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    @Validate(required, 'Введите номер телефона')
    public username = '';

    setFormData(user: IUser): void {
        this.email = user.email;
        this.vk = user.vk;
        this.facebook = user.facebook;
        this.instagram = user.instagram;
        this.skype = user.skype;
        this.username = '+' + user.username;
    }
    getFormData(): ProfileContactDataRequestType {
        return {
            email: this.email,
            vk: this.vk,
            facebook: this.facebook,
            instagram: this.instagram,
            skype: this.skype,
        };
    }
}
