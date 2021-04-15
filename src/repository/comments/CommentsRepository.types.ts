import {IComments} from '@/entity/comments/comments.types';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';
import {CommentsChangeRequestType} from '@/form/commentsChange/commentsChangeForm.types';

export interface ICommentsRepository {
    fetchAll(route: string, data?: FormData): Promise<IComments[]>;
    postComment(data: CommentsFormRequestType): Promise<ICommentsAnswers>;
    deleteComment(route: string): Promise<boolean>;
    patchComment(data: CommentsChangeRequestType, route: string): Promise<ICommentsAnswers>;
    setLikeDislikeComment(data: {is_like: boolean}, route: string): Promise<boolean>;
    deleteLikeDislikeComment(route: string): Promise<boolean>;
}
