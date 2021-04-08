import { Component } from 'vue-property-decorator';
import {maxLength, minLength, numeric, required, requiredIf} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {IMailFormList, MailFormRequestType} from '@/form/mail/mailForm.types';
import {ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

@Component
export class MailForm extends Form {
    public levelId: number | null = 0;
    public levelList: IMailFormList[] = [];
    public region = '';
    public phone = '';


    @Validate(requiredIf(function (vm): boolean {
        return vm.email === '';
    }), 'Введите телефон или email')
    public resultPhone = '';

    @Validate(required, 'Введите имя')
    public name = '';

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
            phoneNumber: this.resultPhone,
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
