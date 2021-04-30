import {IMessages, MessagesResponseType} from '@/entity/messages/messages.types';

export default class Messages implements IMessages {
    id: number;
    createdAt: string;
    text: string;
    isMy: boolean;

    constructor(data: MessagesResponseType) {
        this.id = data.id;
        this.createdAt = this.getTime(data.created_at);
        this.text = data.text;
        this.isMy = data.is_my;
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000);
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}
