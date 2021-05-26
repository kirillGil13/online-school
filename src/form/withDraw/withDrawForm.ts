import { Component } from 'vue-property-decorator';
import {numeric, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {WithDrawRequestType} from '@/form/withDraw/withDrawForm.types';

@Component
export class WithDrawForm extends Form {

    public person = '';

    @Validate(required, 'Введите сумму')
    @Validate(numeric, 'Можно вводить только цифры')
    public sum = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): WithDrawRequestType {
        return {
            sum: +this.sum
        };
    }
    setFormData(person: string): void {
        this.person = person;
    }
}
