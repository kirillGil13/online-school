import { Component } from 'vue-property-decorator';
import {required, sameAs} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {IMailFormList, MailFormRequestType} from '@/form/mail/mailForm.types';
import {ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

@Component
export class MailForm extends Form {
    public levelId: number | null = 0;
    public topic = '';
    public description = '';
    public levelList: IMailFormList[] = [];
    public phone = '';
    public phoneMask = '';

    @Validate(required, 'Введите имя')
    public name = '';

    @Validate(sameAs(() => true), (form: MailForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

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