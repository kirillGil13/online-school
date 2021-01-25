import {Component} from 'vue-property-decorator';
import {maxLength, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import {ProfileMainInfoFormRequestType} from '@/form/profile/mainInfo/ProfileMainInfoForm.types';
import {IUser} from '@/entity/user';

@Component({
    validations: {
        name: {
            required,
            maxLength: maxLength(30),
        },
        surname: {
            required,
            maxLength: maxLength(30),
        },
        description: {
            maxLength: maxLength(50),
        },
    },
})
export class ProfileMainInfoForm extends Form {
    public id = 0;
    public name = '';
    public surname = '';
    public login = '';
    public description = '';

    public serverErrors: { [key: string]: string[] } = {};

    public messages = {
        name: {
            required: 'Введите имя',
            maxLength: 'Имя не должно превышать 30 символов',
        },
        surname: {
            required: 'Введите фамилию',
            maxLength: 'Фамилия не должна превышать 30 символов',
        },
        description: {
            maxLength: 'Описание не должно превышать 50 символов',
        }
    };
    setFormData(user: IUser): void {
        this.id = user.id;
        this.name = user.name;
        this.surname = user.surname;
        this.login = user.login;
        this.description = user.description;
    }
    getFormData(): ProfileMainInfoFormRequestType {
        return {
            name: this.name,
            surname: this.surname,
            login: this.login,
            description: this.description
        };
    }
    getFullPhone(): string {
        return '';
    }
}
