import Api from '@/repository/api';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {CommentsAnswersResponseType, ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';
import CommentsAnswers from '@/entity/commentsAnswers/commentsAnswers';
import {ICommentsAnswersRepository} from '@/repository/commentsAnswers/CommentsAnswersRepository.types';
import {CommentsChangeRequestType} from '@/form/commentsChange/commentsChangeForm.types';

export class CommentsAnswersRepository implements ICommentsAnswersRepository {
    async postAnswer(data: CommentsFormRequestType): Promise<ICommentsAnswers> {
        const response = await Api.post('/comment_answers', data);
        const responseData = response.data as CommentsAnswersResponseType;
        return new CommentsAnswers(responseData);
    }
    async deleteAnswer(route: string): Promise<boolean> {
        const response = await Api.delete(`/comment_answers/${route}`);
        const responseData = response.data;
        return responseData.result;
    }
    async patchAnswer(data: CommentsChangeRequestType, route: string): Promise<ICommentsAnswers> {
        const response = await Api.patch(`/comment_answers/${route}`, data);
        const responseData = response.data as CommentsAnswersResponseType;
        return new CommentsAnswers(responseData);
    }
    async setLikeDislikeAnswer(data: {is_like: boolean}, route: string): Promise<boolean> {
        const response = await Api.post(`comment_answers/${route}/likes-dislikes`, data);
        const responseData = response.data;
        return responseData.result;
    }
    async deleteLikeDislikeAnswer(route: string): Promise<boolean> {
        const response = await Api.delete(`comment_answers/${route}/likes-dislikes`);
        const responseData = response.data;
        return responseData.result;
    }
}
