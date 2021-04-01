import {Component} from 'vue-property-decorator';
import { Form } from '@/form/form';
import {ProfileMainInfoRequestType} from '@/form/profile/mainInfo/ProfileMainInfoForm.types';
import {IUser} from '@/entity/user';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {maxLength, required} from 'vuelidate/lib/validators';

@Component
export class ProfileMainInfoForm extends Form {
    public id = 0;
    public login = '';

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(required, 'Введите имя')
    public name = '';

    @Validate(required, 'Введите фамилию')
    public surname = '';

    @Validate(maxLength(100), 'Описание не должно превышать 50 символов')
    public description = '';

    setFormData(user: IUser): void {
        this.id = user.id;
        this.name = user.name;
        this.surname= user.lastName;
        this.login = user.login!;
        this.description = user.description!;
    }
    getFormData(): ProfileMainInfoRequestType {
        return {
            name: this.name,
            surname: this.surname,
            login: this.login,
            description: this.description
        };
    }
}
