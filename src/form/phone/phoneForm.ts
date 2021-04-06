import { Component } from 'vue-property-decorator';
import {maxLength, minLength, sameAs} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';

@Component
export class PhoneForm extends Form {
    @Validate(maxLength(15), 'Номер не должен превышать 15 символов')
    @Validate(minLength(11), 'Номер должен быть не меньше 11 символов')
    public phone = '+';


    public phoneMask = '';
    public token = '';

    @Validate(sameAs(() => true), (form: PhoneForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): PhoneRequestType {
        return {
            /* eslint-disable */
            /* tslint:disable */
            // @ts-ignore
            phone_number: this.phone,
            recaptcha_token: this.token
        };
    }
}
