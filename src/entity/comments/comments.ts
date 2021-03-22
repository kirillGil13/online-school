import {CommentsResponseType, IComments, ICommentsAuthor} from '@/entity/comments/comments.types';
import {ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';

export default class Comments implements IComments{
    id: number;
    createdAt: string;
    author: ICommentsAuthor;
    message: string;
    countLikes: string;
    countDislikes: string;
    isLiked: boolean | null;
    answers: ICommentsAnswers[] = [];

    constructor(data: CommentsResponseType) {
        this.id = data.id;
        this.createdAt = this.getTime(data.created_at);
        this.author = data.author;
        this.message = data.message;
        this.countLikes = data.count_likes === 0 ? '' : data.count_likes.toString();
        this.countDislikes = data.count_dislikes === 0 ? '' : data.count_dislikes.toString();
        this.isLiked = data.is_liked;
        for (let i = 0; i < data.answers.length; i++) {
            this.answers.push({
                id: data.answers[i].id,
                createdAt: this.getTime(data.answers[i].created_at),
                author: data.answers[i].author,
                message: data.answers[i].message,
                countLikes: data.count_likes === 0 ? '' : data.count_likes.toString(),
                countDislikes: data.count_dislikes === 0 ? '' : data.count_dislikes.toString(),
                isLiked: data.is_liked,
                fullName: data.author.name + ' ' + data.author.lastName
            })
        }
    }

    get fullName(): string {
        return this.author.name + ' ' + this.author.lastName;
    }

    prettierMsg(index: number): string {
        let substr = '';
        if (this.answers[index].message.includes(this.fullName)) {
            substr = this.answers[index].message.replace(this.fullName, '<strong style="color: #426DF6">' + this.fullName + '</strong>');
        }
        else if (!this.answers[index].message.includes(this.fullName)){
            for (let i = 0; i < this.answers.length; i++) {
                if (this.answers[index].message.includes(this.answers[i].fullName)) {
                    substr = this.answers[index].message.replace(this.answers[i].fullName, '<strong style="color: #426DF6">' + this.answers[i].fullName + '</strong>');
                }
            }
        }
        return substr;
    }

    getTime(seconds: number): string {
        const date = new Date(seconds * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17);
    }

    getAnswersLength(): string {
        return this.answers.length + ' ' + this.declination(this.answers.length, ['ответ', 'ответа', 'ответов'])
    }

    declination(number: number, titles: string[]): string {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
}
