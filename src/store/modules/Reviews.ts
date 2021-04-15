import {getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import { IReviews } from '@/entity/reviews/reviews.types';

@Module({
    namespaced: true,
    name: 'reviews',
    store,
    dynamic: true,
})
class ReviewsModule extends VuexModule {
    reviews: IReviews[] = [];
    reviewsLoaded = false;

    @Mutation
    setreviewsToEmpty(): void {
        this.reviewsLoaded = false;
        this.reviews = [];
    }

    @MutationAction
    async fetchAll(id: string): Promise<{ reviews: IReviews[]; reviewsLoaded: boolean }> {
        const reviews = await store.$repository.reviews.fetchAll(id);
        console.log(reviews)
        let reviewsLoaded = false;
        if (reviews)
            reviewsLoaded = true;
        return { reviews, reviewsLoaded };
    }
}

export const ReviewsStore = getModule(ReviewsModule);
