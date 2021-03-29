import { Component } from 'vue-property-decorator';
import {required, sameAs} from 'vuelidate/lib/validators';
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

    @Validate(sameAs('password'), 'Пароли не совпадают')
    @Validate(required, 'Подтвердите пароль')
    public confirmPassword = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): RecoverDoRequestType {
        return {
            accountId: this.accountId,
            code: this.code,
            newPassword: this.password
        };
    }

    setFormData(id: string, code: string): void {
        this.accountId = parseInt(id);
        this.code = code;
    }
}
