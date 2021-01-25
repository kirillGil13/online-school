import {Component} from 'vue-property-decorator';
import {maxLength, minLength, required, requiredIf} from 'vuelidate/lib/validators';
import { LoginRequestType } from '@/form/login';
import { Form } from '@/form/form';

@Component({
    validations: {
        phone: {
            required,
            minLength: minLength(12),
            maxLength: maxLength(12),
        },
        code: {
            required: requiredIf('codeStep'),
            minLength: !requiredIf('codeStep') || minLength(4),
            maxLength: !requiredIf('codeStep') || maxLength(4),
        },
    },
})
export class LoginForm extends Form {
    public phone = '';
    public code = '';
    public codeStep = false;

    public serverErrors: { [key: string]: string[] } = {};

    public messages = {
        phone: {
            required: 'Введите номер телефона',
            minLength: 'Введите корректный номер телефона',
            maxLength: 'Введите корректный номер телефона',
        },
        code: {
            required: 'Введите код подтверждения',
            minLength: 'Код подтверждения должен быть равным 4 символам',
            maxLength: 'Код подтверждения должен быть равным 4 символам',
        },
    };

    getFormData(): LoginRequestType {
        console.log(this)
        return {
            phone: this.phone.slice(1) ?? '',
            code: this.code ?? '',
        };
    }
    getFullPhone(): string {
        return [this.phone.slice(0, 2), ' ', this.phone.slice(2,5), ' ', this.phone.slice(5,8), ' ', this.phone.slice(8,10), ' ', this.phone.slice(10)].join('')
    }
}
