import { Component } from 'vue-property-decorator';
import {email, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {RecoverSendCodeRequestType} from '@/form/recover/recoverSendCode/recoverSendCodeForm.types';

@Component
export class RecoverSendCodeForm extends Form {

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public username = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): RecoverSendCodeRequestType {
        return {
            email: this.username
        };
    }
}
