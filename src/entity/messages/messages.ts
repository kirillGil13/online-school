import {IMessages, MessagesResponseType} from '@/entity/messages/messages.types';

export default class Messages implements IMessages {
    id: number;
    createdAt: number;
    text: string;
    isMy: boolean;

    constructor(data: MessagesResponseType) {
        this.id = data.id;
        this.createdAt = data.created_at;
        this.text = data.text;
        this.isMy = data.is_my;
    }
}
