import { Component } from 'vue-property-decorator';
import { required } from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {CodeRequestType} from '@/form/code/codeForm.types';
/* eslint-disable */
/* tslint:disable */
@Component
export class CodeForm extends Form {
    public phone = '';

    @Validate(required, 'Введите код')
    public code = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): CodeRequestType {
        return {
            phone_number: this.phone,
            code: this.code,
        };
    }
}
