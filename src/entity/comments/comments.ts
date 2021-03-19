import {CommentsResponseType, IComments, ICommentsAnswers, ICommentsAuthor} from '@/entity/comments/comments.types';

export default class Comments implements IComments{
    id: number;
    createdAt: string;
    author: ICommentsAuthor;
    message: string;
    countLikes: number;
    countDislikes: number;
    answers: ICommentsAnswers[] = [];

    constructor(data: CommentsResponseType) {
        this.id = data.id;
        this.createdAt = this.getTime(data.created_at);
        this.author = data.author;
        this.message = data.message;
        this.countLikes = data.count_likes;
        this.countDislikes = data.count_dislikes;
        for (let i = 0; i < data.answers.length; i++) {
            this.answers.push({
                id: data.answers[i].id,
                createdAt: this.getTime(data.answers[i].created_at),
                author: data.answers[i].author,
                message: data.answers[i].message,
                countLikes: data.answers[i].count_likes,
                countDislikes: data.answers[i].count_dislikes,
            })
        }
    }

    getTime(seconds: number): string {
        const date = new Date(seconds * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17);
    }
}
