export interface IMessages {
    id: number;
    createdAt: string;
    text: string;
    isMy: boolean;
    photoLink?: string[]
}
export type MessagesResponseType = {
    id: number;
    created_at: number;
    text: string;
    is_my: boolean;
    photo_links?: string[];
}
