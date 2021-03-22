import {CommentsAnswersResponseType, ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';

export interface IComments {
    id: number;
    createdAt: string;
    author: ICommentsAuthor;
    message: string;
    countLikes: string;
    countDislikes: string;
    answers: ICommentsAnswers[];
    isLiked: boolean | null;
    getTime(sec: number): string;
    getAnswersLength(): string;
    prettierMsg(index: number): string;
    fullName: string;
}

export interface ICommentsAuthor {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}

export type CommentsResponseType = {
    id: number;
    created_at: number;
    author: CommentsAuthorResponseType;
    message: string;
    count_likes: number;
    count_dislikes: number;
    is_liked: boolean | null;
    answers: CommentsAnswersResponseType[];
}

export type CommentsAuthorResponseType = {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}

