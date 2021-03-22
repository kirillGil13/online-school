import { Component } from 'vue-property-decorator';
import { Form } from '@/form/form';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';

@Component
export class CommentsForm extends Form {

    public message = '';
    public lessonId: number | null = null;
    public commentId: number | null = null;
    public author = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): CommentsFormRequestType {
        return {
            message: this.message,
            lesson_id: this.lessonId === 0 ? null : this.lessonId,//eslint-disable-line
            comment_id: this.commentId === 0 ? null : this.commentId,//eslint-disable-line
        };
    }
}
