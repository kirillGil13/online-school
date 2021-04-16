import {CommentsAnswersResponseType, ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';
import {ICommentsAuthor} from '@/entity/comments/comments.types';

export default class CommentsAnswers implements ICommentsAnswers {
    id: number;
    createdAt: string;
    author: ICommentsAuthor;
    message: string;
    countLikes: string;
    countDislikes: string;
    isLiked: boolean | null;
    isMy: boolean;

    constructor(data: CommentsAnswersResponseType) {
        this.id = data.id;
        this.createdAt = this.getTime(data.created_at);
        this.author = data.author;
        this.message = data.message;
        this.countLikes = data.count_likes.toString();
        this.countDislikes = data.count_dislikes.toString();
        this.isLiked = data.is_liked;
        this.isMy = data.isMy;
    }

    get fullName(): string {
        return this.author.name + ' ' + this.author.lastName;
    }

    getTime(seconds: number): string {
        const date = new Date(seconds * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17);
    }
}
