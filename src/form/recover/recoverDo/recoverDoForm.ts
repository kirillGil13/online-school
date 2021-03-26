import { Component } from 'vue-property-decorator';
import { required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {RecoverDoRequestType} from '@/form/recover/recoverDo/recoverDoForm.types';

@Component
export class RecoverDoForm extends Form {

    public accountId = 0;

    @Validate(required, 'Введите код')
    public code = '';

    @Validate(required, 'Введите пароль')
    public password = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): RecoverDoRequestType {
        return {
            accountId: this.accountId,
            code: this.code,
            newPassword: this.password
        };
    }
}
