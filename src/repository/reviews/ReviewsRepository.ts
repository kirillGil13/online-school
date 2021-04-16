import Api from '@/repository/api';
import { IReviewsRepository } from './ReviewsRepository.types';
import { IReviews, ReviewsResponseType } from '@/entity/reviews/reviews.types';
import Reviews from '@/entity/reviews/reviews';

export class ReviewsRepository implements IReviewsRepository {
    async fetchAll(id: string): Promise<IReviews[]> {
        const response = await Api.get(`/reviews/courses/${id}`);
        const data = response.data as ReviewsResponseType[];
        return data.map((review: ReviewsResponseType) => new Reviews(review));
    }
}
