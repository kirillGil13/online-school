import { Component } from 'vue-property-decorator';
import {required, sameAs, email, minLength} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {RegisterRequestType} from '@/form/register/RegisterForm.types';

@Component
export class RegisterForm extends Form {
    public phoneNumber = '';
    public photoLink = '';

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
            phoneNumber: this.phoneNumber,
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            photoLink: this.photoLink
        };
    }
}
