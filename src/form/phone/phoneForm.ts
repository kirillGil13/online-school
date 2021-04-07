import { Component } from 'vue-property-decorator';
import {maxLength, minLength, numeric, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';

@Component
export class PhoneForm extends Form {

    public region = '';

    @Validate(numeric, 'Поле должно содержать только цифры')
    @Validate(minLength(8), 'Номер должен быть не меньше 8 символов')
    @Validate(maxLength(12), 'Номер должен быть не больше 12 символов')
    @Validate(required, 'Введите номер')
    public phone = '';

    public token = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): PhoneRequestType {
        return {
            /* eslint-disable */
            /* tslint:disable */
            // @ts-ignore
            phone_number: this.region + this.phone,
            recaptcha_token: this.token
        };
    }
}
