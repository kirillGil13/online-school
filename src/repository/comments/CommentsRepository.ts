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

export class CommentsRepository implements ICommentsRepository {
    async fetchAll(route: string): Promise<IComments[]> {
        const response = await Api.get(`/comments/lessons/${route}`);
        const data = response.data as CommentsResponseType[];
        return data.map((comment: CommentsResponseType) => new Comments(comment));
    }
    async postComment(data: CommentsFormRequestType): Promise<ICommentsAnswers> {
        const response = await Api.post('/comments', data);
        const responseData = response.data as CommentsAnswersResponseType;
        return new CommentsAnswers(responseData);
    }
    async postAnswer(data: CommentsFormRequestType): Promise<ICommentsAnswers> {
        const response = await Api.post('/comment_answers', data);
        const responseData = response.data as CommentsAnswersResponseType;
        return new CommentsAnswers(responseData);
    }
    async setLikeDislikeComment(data: {is_like: boolean}, route: string): Promise<boolean> {
        const response = await Api.post(`comments/${route}/likes-dislikes`, data);
        const responseData = response.data;
        return responseData.result;
    }
    async setLikeDislikeAnswer(data: {is_like: boolean}, route: string): Promise<boolean> {
        const response = await Api.post(`comment_answers/${route}/likes-dislikes`, data);
        const responseData = response.data;
        return responseData.result;
    }
    async deleteLikeDislikeComment(route: string): Promise<boolean> {
        const response = await Api.delete(`comments/${route}/likes-dislikes`);
        const responseData = response.data;
        return responseData.result;
    }
    async deleteLikeDislikeAnswer(route: string): Promise<boolean> {
        const response = await Api.delete(`comment_answers/${route}/likes-dislikes`);
        const responseData = response.data;
        return responseData.result;
    }
}
