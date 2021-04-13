export interface IRewiews {
    id: number,
    createdAt: string,
    isLike: boolean | null,
    reviewText: string,
    author: IRewiewsAuthor
}


export interface IRewiewsAuthor {
    id: number;
    name: string;
    lastName: string;
    photoLink: string
}

export type RewiewsResponseType = {
    id: number;
    created_at: number;
    author: IRewiewsAuthor;
    review_text: string;
    is_like: boolean | null;
}
