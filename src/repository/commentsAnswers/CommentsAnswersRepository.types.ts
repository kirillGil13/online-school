import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';
import {CommentsChangeRequestType} from '@/form/commentsChange/commentsChangeForm.types';

export interface ICommentsAnswersRepository {
    postAnswer(data: CommentsFormRequestType): Promise<ICommentsAnswers>;
    deleteAnswer(route: string): Promise<boolean>;
    patchAnswer(data: CommentsChangeRequestType, route: string): Promise<ICommentsAnswers>;
    setLikeDislikeAnswer(data: {is_like: boolean}, route: string): Promise<boolean>;
    deleteLikeDislikeAnswer(route: string): Promise<boolean>;
}
