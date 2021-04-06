import {Component} from 'vue-property-decorator';
import { Form } from '@/form/form';
import {ProfileMainInfoRequestType} from '@/form/profile/mainInfo/ProfileMainInfoForm.types';
import {IUser} from '@/entity/user';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {maxLength, required} from 'vuelidate/lib/validators';

@Component
export class ProfileMainInfoForm extends Form {
    public id = 0;

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(required, 'Введите имя')
    public name = '';

    @Validate(required, 'Введите фамилию')
    public surname = '';

    @Validate(maxLength(1000), 'Описание не должно превышать 1000 символов')
    public description = '';

    setFormData(user: IUser): void {
        this.id = user.id;
        this.name = user.name;
        this.surname= user.lastName;
        this.description = user.description!;
    }
    getFormData(): ProfileMainInfoRequestType {
        return {
            name: this.name,
            surname: this.surname,
            description: this.description
        };
    }
}
