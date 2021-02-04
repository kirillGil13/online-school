import {Component} from 'vue-property-decorator';
import {maxLength, minLength, required, email} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import {CandidateFormRequestType, ICandidateForm} from '@/form/candidate/candidateForm.types';

@Component({
    validations: {
        phone: {
            required,
            minLength: minLength(12),
            maxLength: maxLength(12),
        },
        name: {
            required
        },
        email: {
            email
        }
    },
})
export class CandidateForm extends Form implements ICandidateForm{
    public name = '';
    public email = '';
    public phone = '';
    public product = '';
    public status = '';
    public productList: string[] = [];
    public statusList: string[] = [];

    public serverErrors: { [key: string]: string[] } = {};

    public messages = {
        phone: {
            required: 'Введите номер телефона',
            minLength: 'Введите корректный номер телефона',
            maxLength: 'Введите корректный номер телефона',
        },
        name: {
            required: 'Введите имя',
        },
        email: {
            email: 'Введите корректный email'
        }
    };

    getFormData(): CandidateFormRequestType {
        return {
            phone: this.phone.slice(1) ?? '',
            name: this.name,
            email: this.email,
            product: this.product,
            status: this.status
        };
    }
    getFullPhone(): string {
        return '';
    }
}
