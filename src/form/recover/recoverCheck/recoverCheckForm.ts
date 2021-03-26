import { Component } from 'vue-property-decorator';
import { required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {RecoverCheckRequestType} from '@/form/recover/recoverCheck/recoverCheckForm.types';

@Component
export class RecoverCheckForm extends Form {

    public accountId = 0;

    @Validate(required, 'Введите код')
    public code = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): RecoverCheckRequestType {
        return {
            accountId: this.accountId,
            code: this.code,
        };
    }
}
