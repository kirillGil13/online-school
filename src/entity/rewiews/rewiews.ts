import { IRewiews, IRewiewsAuthor, RewiewsResponseType } from './rewiews.types';

export default class Rewiews implements IRewiews{
    id: number;
    createdAt: string;
    isLike: boolean | null;
    reviewText: string;
    author: IRewiewsAuthor

    constructor(data: RewiewsResponseType) {
        this.id = data.id;
        this.createdAt = this.getTime(data.created_at);
        this.author = data.author;
        this.isLike = data.is_like;
        this.reviewText = data.review_text;
    }

    get fullName(): string {
        return this.author.name + ' ' + this.author.lastName;
    }

    getTime(seconds: number): string {
        const date = new Date(seconds * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17).toString();
    }

}
