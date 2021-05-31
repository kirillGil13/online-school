import { IReviews, IReviewsAuthor, ReviewsResponseType } from './reviews.types';
import {MONTHS} from '../../constants/index';

export default class Reviews implements IReviews{
    id: number;
    createdAt: string;
    isLike: null | boolean;
    reviewText: string;
    author: IReviewsAuthor

    constructor(data: ReviewsResponseType) {
        this.id = data.id;
        this.createdAt = this.getTime(data.createdAt);
        this.author = data.author;
        this.isLike = data.isLike;
        this.reviewText = data.reviewText;
    }

    get fullName(): string {
        return this.author.name + ' ' + this.author.lastName;
    }

    getTime(seconds: number): string {
        const date = new Date(seconds * 1000);
        const month = MONTHS.find(el => el.id === (date.getMonth() + 1))
        return date.toLocaleString().slice(0,2) + ' ' + month!.value + date.toLocaleString().slice(10,17).toString();
    }

}
