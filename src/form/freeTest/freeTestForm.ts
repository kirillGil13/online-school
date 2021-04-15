import { Component } from 'vue-property-decorator';
import { required } from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {FreeTestRequestType} from '@/form/freeTest/freeTestForm.types';

@Component
export class FreeTestForm extends Form {
    public homeworkId = 0;
    public question = '';
    public passed = false;
    @Validate(required, 'Введите ответ')
    public answer = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): FreeTestRequestType {
        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            answer_text: this.answer
        };
    }

    setFormData(homeworkId: number, question: string, passed: boolean, answer: string): void {
        this.answer = answer;
        this.question = question;
        this.homeworkId = homeworkId;
        this.passed = passed;
    }
}
