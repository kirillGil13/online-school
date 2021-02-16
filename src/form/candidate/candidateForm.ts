import {Component} from 'vue-property-decorator';
import { Form } from '@/form/form';
import {CandidateFormRequestType, ICandidateForm} from '@/form/candidate/candidateForm.types';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {required, sameAs, email} from 'vuelidate/lib/validators';

@Component
export class CandidateForm extends Form implements ICandidateForm{
    public phoneMask = '';
    public product = '';
    public phone = '';
    public status = '';
    public productList: string[] = [];
    public statusList: string[] = [];

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(sameAs(() => true), (form: CandidateForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите имя ')
    public name = '';

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный Email')
    public email = '';

    getFormData(): CandidateFormRequestType {
        return {
            phone: this.phone,
            name: this.name,
            email: this.email,
            product: this.product,
            status: this.status
        };
    }


}
