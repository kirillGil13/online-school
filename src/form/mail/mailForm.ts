import { Component } from 'vue-property-decorator';
import {maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {IMailFormList, MailFormRequestType} from '@/form/mail/mailForm.types';
import {ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

@Component
export class MailForm extends Form {
    public levelId: number | null = 0;
    public levelList: IMailFormList[] = [];

    @Validate(maxLength(15), 'Номер не должен превышать 15 символов')
    @Validate(minLength(11), 'Номер должен быть не меньше 11 символов')
    public phone = '+';


    public phoneMask = '';

    @Validate(required, 'Введите имя')
    public name = '';

    @Validate(sameAs(() => true), (form: MailForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите название курса')
    @Validate(minLength(3), 'Название должно содержать не меньше 3 символов')
    public topic = '';

    @Validate(required, 'Введите описание курса')
    @Validate(minLength(3), 'Описание должно содержать не меньше 3 символов')
    public description = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): MailFormRequestType {
        return {
            name: this.name,
            topic: this.topic,
            description: this.description,
            phoneNumber: this.phone,
            levelId: this.levelId
        };
    }

    setFormData(levels: ICourseLevels[]): void {
        for (let i = 0; i < levels.length; i++) {
            this.levelList.push({text: levels[i].name, value: levels[i].id});
        }
        this.levelId = this.levelList[0].value;
    }
}
