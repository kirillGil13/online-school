import {RequestType} from '@/form/form.types';

export type ReviewsFormRequestType = RequestType & {
    reviewText: string;
    review_id?: number | null;
    is_like?: null | boolean;
}

export enum ReviewsFormName {
    likeDislike= 'likeDislike',
    review= 'review'
}
