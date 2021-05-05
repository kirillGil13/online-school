import { Component } from 'vue-property-decorator';
import { Form } from '@/form/form';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {maxLength, required} from 'vuelidate/lib/validators';

@Component
export class CommentsForm extends Form {
    @Validate(required, '')
    @Validate(maxLength(2000), 'Сообщение не должно быть больше 2000 символов')
    public message = '';

    public lessonId: number | null = null;
    public commentId: number | null = null;
    public author = '';
    public showAnswersForm = false;
    public showCommentsForm = false;
    public answersIndex: number | null = null;
    fullScreen = false;

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): CommentsFormRequestType {
        return {
            message: this.message,
            lesson_id: this.lessonId === 0 ? null : this.lessonId,//eslint-disable-line
            comment_id: this.commentId === 0 ? null : this.commentId,//eslint-disable-line
        };
    }
}
