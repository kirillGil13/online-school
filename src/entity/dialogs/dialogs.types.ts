export interface IDialogs {
    id: number;
    account: IDialogsAuthor;
    lastMessage: IDialogsLastMessage;
    fullName: string;
    countUnread: number;
    getTime(seconds: number | null): string;
}
export interface IDialogsLastMessage {
    id: number;
    createdAt: string;
    text: string;
    isMy: boolean;
}

export interface IDialogsAuthor {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}

export type DialogsResponseType = {
    id: number;
    account: DialogsAuthorResponseType;
    last_message: DialogsLastMessageResponseType;
    count_unread: number;
}

export type DialogsAuthorResponseType = {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}

export type DialogsLastMessageResponseType = {
    id: number;
    created_at: number;
    text: string;
    is_my: boolean;
}


