export interface IMessages {
    id: number;
    createdAt: number;
    text: string;
    isMy: boolean;
}
export type MessagesResponseType = {
    id: number;
    created_at: number;
    text: string;
    is_my: boolean;
}
