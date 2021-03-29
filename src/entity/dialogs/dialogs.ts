import {DialogsResponseType, IDialogs, IDialogsAuthor, IDialogsLastMessage} from '@/entity/dialogs/dialogs.types';

export default class Dialogs implements IDialogs{
    id: number;
    account: IDialogsAuthor;
    lastMessage: IDialogsLastMessage = {
        id: 0,
        createdAt: '',
        text: '',
        isMy: false,
    };

    constructor(data: DialogsResponseType) {
        this.id = data.id;
        this.account = data.account;
        this.lastMessage.createdAt = this.getTime(data.last_message.created_at);
        this.lastMessage.text = data.last_message.text;
        this.lastMessage.id = data.last_message.id;
        this.lastMessage.isMy = data.last_message.is_my;
    }

    get fullName(): string {
        return this.account.name + ' ' + this.account.lastName;
    }

    getTime(seconds: number | null): string {
        if (seconds) {
            const date = new Date(seconds * 1000)
            return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17);
        } else return '';
    }
}
