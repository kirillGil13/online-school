import { Component } from 'vue-property-decorator';
import {required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';

@Component
export class PhoneForm extends Form {
    @Validate(required, 'Введите номер')
    public resultPhone = '';

    public phone = '';

    public token = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): PhoneRequestType {
        return {
            /* eslint-disable */
            /* tslint:disable */
            // @ts-ignore
            phone_number: this.resultPhone,
            recaptcha_token: this.token
        };
    }
}
