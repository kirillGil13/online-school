import {Component} from 'vue-property-decorator';
import { Form } from '@/form/form';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {maxLength, required, email} from 'vuelidate/lib/validators';

@Component
export class ProfileDocumentsForm extends Form {
    public id = 0;

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(required, 'Введите имя и фамилию')
    public name = '';

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    @Validate(required, 'Введите номер')
    public resultPhone = '';

    public phone = '';

    @Validate(required, 'Введите название компании')
    public companyName = '';

    @Validate(maxLength(1000), 'Описание не должно превышать 1000 символов')
    public description = '';

    // setFormData(): void {
    // }

    // getFormData(): ProfileDocumentsRequestType {
    //     return {
    //         name: this.name,
    //         surname: this.surname,
    //         description: this.description
    //     };
    // }
}
