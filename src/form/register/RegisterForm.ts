import { Component } from 'vue-property-decorator';
import {required, sameAs, email, minLength} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {RegisterRequestType} from '@/form/register/RegisterForm.types';
import {countries} from '@/countries';

@Component
export class RegisterForm extends Form {
    public phone = '';

    public photoLink = '';
    public defaultCountry = '';

    @Validate(required, 'Введите номер')
    public resultPhone = '';

    @Validate(required, 'Введите имя')
    @Validate(minLength(2), 'Имя должно быть не меньше двух символов')
    public name = '';

    @Validate(required, 'Введите фамилию')
    @Validate(minLength(2), 'Фамилия должна быть не меньше двух символов')
    public lastName = '';

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    @Validate(required, 'Введите пароль')
    public password = '';

    @Validate(sameAs('password'), 'Пароли не совпадают')
    @Validate(required, 'Подтвердите пароль')
    public confirm_password = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): RegisterRequestType {
        return {
            phoneNumber: this.resultPhone,
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            photoLink: this.photoLink
        };
    }

    setFormData(data: string): void {
        for (let i = 0; i < countries.length; i++) {
            if (data) {
                if (data.indexOf('+' + countries[i].code) >= 0) {
                    this.defaultCountry = countries[i].iso;
                    this.phone = data.replace('+' + countries[i].code, '');
                }
            }
            else {
                this.phone = '';
                this.defaultCountry = '';
            }
        }
    }
}
