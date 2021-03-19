export interface IComments {
    id: number;
    createdAt: string;
    author: ICommentsAuthor;
    message: string;
    countLikes: number;
    countDislikes: number;
    answers: ICommentsAnswers[];
    getTime(sec: number): string;
}

export interface ICommentsAuthor {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}

export interface ICommentsAnswers{
    id: number;
    createdAt: string;
    author: ICommentsAuthor;
    message: string;
    countLikes: number;
    countDislikes: number;
}

export type CommentsResponseType = {
    id: number;
    created_at: number;
    author: CommentsAuthorResponseType;
    message: string;
    count_likes: number;
    count_dislikes: number;
    answers: CommentsAnswersResponseType[];
}

export type CommentsAuthorResponseType = {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}

export type CommentsAnswersResponseType = {
    id: number;
    created_at: number;
    author: CommentsAuthorResponseType;
    message: string;
    count_likes: number;
    count_dislikes: number;
}
