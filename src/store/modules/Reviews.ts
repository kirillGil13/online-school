import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IReviews} from '@/entity/reviews/reviews.types';

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

    @Mutation
    setReviews(data: {reviews: IReviews[]; reviewsLoaded: boolean; scroll: boolean}): void {
        if (!data.scroll) {
            this.reviews = data.reviews;
        } else {
            this.reviews = this.reviews.concat(data.reviews);
        }
        this.reviewsLoaded = data.reviewsLoaded;
    }

    @Action({commit: 'setReviews'})
    async fetchAll(data: { route: string; scroll?: boolean }): Promise<{ reviews: IReviews[]; reviewsLoaded: boolean; scroll: boolean }> {
        const reviews = await store.$repository.reviews.fetchAll(data.route);
        let reviewsLoaded = false;
        let scroll = false;
        if (data.scroll) {
            scroll = data.scroll;
        }
        if (reviews)
            reviewsLoaded = true;
        return {reviews, reviewsLoaded, scroll};
    }
}

export const ReviewsStore = getModule(ReviewsModule);
