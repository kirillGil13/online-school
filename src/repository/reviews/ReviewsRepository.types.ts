import { IReviews } from '@/entity/reviews/reviews.types';

export interface IReviewsRepository {
    fetchAll(id: string): Promise<IReviews[]>;
}
