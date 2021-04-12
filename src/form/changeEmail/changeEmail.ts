import { Component } from 'vue-property-decorator';
import {required, email} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {ChangeEmailRequestType} from '@/form/changeEmail/changeEmail.types';

@Component
export class ChangeEmailForm extends Form {
    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): ChangeEmailRequestType {
        return {
            email: this.email
        };
    }

    setFormData(email: string): void {
        this.email = email;
    }
}
