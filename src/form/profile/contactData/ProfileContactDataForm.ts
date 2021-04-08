import {Component} from 'vue-property-decorator';
import {email, maxLength, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import {IUser} from '@/entity/user';
import {ProfileContactDataRequestType} from '@/form/profile/contactData/ProfileContactDataForm.types';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {countries} from '@/countries';

@Component
export class ProfileContactDataForm extends Form {

    public serverErrors: { [key: string]: string[] } = {};

    public defaultCountry = '';
    public resultPhone = '';
    @Validate(maxLength(30), 'Ссылка на страницу vk не должна превышать 30 символов')
    public vk = '';

    @Validate(maxLength(30), 'Ссылка на страницу facebook не должна превышать 30 символов')
    public facebook = '';

    @Validate(maxLength(30), 'Ссылка на страницу instagram не должна превышать 30 символов')
    public instagram = '';

    @Validate(maxLength(30), 'Ссылка на страницу telegram не должна превышать 30 символов')
    public telegram = '';

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    @Validate(required, 'Введите номер телефона')
    public phone = '';

    setFormData(user: IUser): void {
        this.email = user.email;
        this.vk = user.vkLink;
        this.facebook = user.facebookLink;
        this.instagram = user.instagramLink;
        this.telegram = user.telegram;
        this.phone = user.phoneNumber;
        for (let i = 0; i < countries.length; i++) {
            if (user.phoneNumber) {
                if (user.phoneNumber.indexOf('+' + countries[i].code) >= 0) {
                    this.defaultCountry = countries[i].iso;
                    this.phone = user.phoneNumber.replace('+' + countries[i].code, '');
                }
            }
            else {
                this.phone = '';
                this.defaultCountry = '';
            }
        }
    }
    getFormData(): ProfileContactDataRequestType {
        return {
            email: this.email,
            vk: this.vk,
            facebook: this.facebook,
            instagram: this.instagram,
            telegram: this.telegram,
        };
    }
}
