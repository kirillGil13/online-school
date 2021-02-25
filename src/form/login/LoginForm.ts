import { Component } from 'vue-property-decorator';
import {email, required} from 'vuelidate/lib/validators';
import { LoginRequestType } from '@/form/login';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';

@Component
export class LoginForm extends Form {

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public username = '';

    @Validate(required, 'Введите пароль')
    public password = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): LoginRequestType {
        return {
            username: this.username,
            password: this.password,
        };
    }
}
