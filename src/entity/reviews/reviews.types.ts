export interface IReviews {
    id: number,
    createdAt: string,
    isLike: boolean | null,
    reviewText: string,
    author: IReviewsAuthor
}


export interface IReviewsAuthor {
    id: number;
    name: string;
    lastName: string;
    photoLink: string
}

export type ReviewsResponseType = {
    id: number;
    createdAt: number;
    author: IReviewsAuthor;
    reviewText: string;
    isLike: boolean | null;
}
