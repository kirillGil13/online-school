import { Component } from 'vue-property-decorator';
import { required, sameAs } from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {CodeRequestType} from '@/form/code/codeForm.types';

@Component
export class CodeForm extends Form {
    public phone = '';
    public phoneMask = '';

    @Validate(sameAs(() => true), (form: CodeForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите код')
    public code = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): CodeRequestType {
        return {
            phone: this.phone,
            code: this.code,
        };
    }
}
