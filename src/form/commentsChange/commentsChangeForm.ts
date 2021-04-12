import { Component } from 'vue-property-decorator';
import { required } from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {CommentsChangeRequestType} from '@/form/commentsChange/commentsChangeForm.types';

@Component
export class CommentsChangeForm extends Form {
    showChangeComment = false;
    showChangeAnswer = false;

    commentId = 0;
    answerId = 0;

    @Validate(required, 'Введите сообщение')
    public message = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): CommentsChangeRequestType {
        return {
            message: this.message
        };
    }

    setFormData(message: string): void {
        this.message = message;
    }
}
