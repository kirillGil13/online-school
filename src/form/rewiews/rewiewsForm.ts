import { Component } from 'vue-property-decorator';
import { Form } from '@/form/form';
import { RewiewsFormRequestType } from './rewiewsForm.types';

@Component
export class CommentsForm extends Form {

    public message = '';
    public courseId: number | null = null;
    public rewiewId: number | null = null;
    public author = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): RewiewsFormRequestType {
        return {
            message: this.message,
            course_id: this.courseId === 0 ? null : this.courseId,//eslint-disable-line
            rewiew_id: this.rewiewId === 0 ? null : this.rewiewId,//eslint-disable-line
        };
    }
}
