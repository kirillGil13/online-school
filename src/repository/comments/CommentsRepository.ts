import Api from '@/repository/api';
import {ICommentsRepository} from '@/repository/comments/CommentsRepository.types';
import {
    CommentsResponseType,
    IComments
} from '@/entity/comments/comments.types';
import Comments from '@/entity/comments/comments';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {CommentsAnswersResponseType, ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';
import CommentsAnswers from '@/entity/commentsAnswers/commentsAnswers';
import {CommentsChangeRequestType} from '@/form/commentsChange/commentsChangeForm.types';

export class CommentsRepository implements ICommentsRepository {
    async fetchAll(route: string, data?: FormData): Promise<IComments[]> {
        const response = await Api.get(`/comments/lessons/${route}`, {params: data, paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString()
            }});
        const responseData = response.data as CommentsResponseType[];
        return responseData.map((comment: CommentsResponseType) => new Comments(comment));
    }
    async deleteComment(route: string): Promise<boolean> {
        const response = await Api.delete(`/comments/${route}`);
        const responseData = response.data;
        return responseData.result;
    }
    async patchComment(data: CommentsChangeRequestType, route: string): Promise<ICommentsAnswers> {
        const response = await Api.patch(`/comments/${route}`, data);
        const responseData = response.data as CommentsAnswersResponseType;
        return new CommentsAnswers(responseData);
    }
    async postComment(data: CommentsFormRequestType): Promise<ICommentsAnswers> {
        const response = await Api.post('/comments', data);
        const responseData = response.data as CommentsAnswersResponseType;
        return new CommentsAnswers(responseData);
    }
    async setLikeDislikeComment(data: {is_like: boolean}, route: string): Promise<boolean> {
        const response = await Api.post(`comments/${route}/likes-dislikes`, data);
        const responseData = response.data;
        return responseData.result;
    }
    async deleteLikeDislikeComment(route: string): Promise<boolean> {
        const response = await Api.delete(`comments/${route}/likes-dislikes`);
        const responseData = response.data;
        return responseData.result;
    }
}
