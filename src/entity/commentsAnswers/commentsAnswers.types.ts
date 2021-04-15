import {CommentsAuthorResponseType, ICommentsAuthor} from '@/entity/comments/comments.types';

export interface ICommentsAnswers{
    id: number;
    createdAt: string;
    author: ICommentsAuthor;
    message: string;
    countLikes: string;
    countDislikes: string;
    isLiked: boolean | null;
    fullName: string;
    isMy: boolean;
}
export type CommentsAnswersResponseType = {
    id: number;
    created_at: number;
    author: CommentsAuthorResponseType;
    message: string;
    is_liked: boolean | null;
    count_likes: number;
    count_dislikes: number;
    isMy: boolean;
}
