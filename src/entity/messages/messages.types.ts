export interface IMessages {
    id: number;
    createdAt: string;
    text: string;
    isMy: boolean;
}
export type MessagesResponseType = {
    id: number;
    created_at: number;
    text: string;
    is_my: boolean;
}
