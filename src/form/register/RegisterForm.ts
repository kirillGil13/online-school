import { Component } from 'vue-property-decorator';
import { required, sameAs, email } from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {RegisterRequestType} from '@/form/register/RegisterForm.types';

@Component
export class RegisterForm extends Form {
    public phone = '';
    public code = '';
    public avatar = '';

    @Validate(required, 'Введите имя')
    public name = '';

    @Validate(required, 'Введите фамилию')
    public surname = '';

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
            phone: this.phone,
            code: this.code,
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            /* eslint-disable */
            /* tslint:disable */
            // @ts-ignore
            confirm_password: this.confirm_password,
            avatar: this.avatar
        };
    }
}