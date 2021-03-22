import {RequestType} from '@/form/form.types';

export type CommentsFormRequestType = RequestType & {
    message: string;
    lesson_id: number | null;
    comment_id?: number | null;
}
