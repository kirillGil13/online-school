import { Component } from 'vue-property-decorator';
import { required, sameAs } from 'vuelidate/lib/validators';
import { LoginRequestType } from '@/form/login';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';

@Component
export class LoginForm extends Form {
    public phone = '';

    public phoneMask = '';

    @Validate(sameAs(() => true), (form: LoginForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите пароль')
    public password = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): LoginRequestType {
        return {
            phone: this.phone,
            password: this.password,
        };
    }
}
