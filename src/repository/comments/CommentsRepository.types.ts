import {IComments} from '@/entity/comments/comments.types';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';

export interface ICommentsRepository {
    fetchAll(route: string): Promise<IComments[]>;
    postComment(data: CommentsFormRequestType): Promise<ICommentsAnswers>;
    postAnswer(data: CommentsFormRequestType): Promise<ICommentsAnswers>;
    setLikeDislikeComment(data: {is_like: boolean}, route: string): Promise<boolean>;
    setLikeDislikeAnswer(data: {is_like: boolean}, route: string): Promise<boolean>;
    deleteLikeDislikeComment(route: string): Promise<boolean>;
    deleteLikeDislikeAnswer(route: string): Promise<boolean>;
}
