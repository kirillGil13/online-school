import Api from '@/repository/api';
import {IMessages, MessagesResponseType} from '@/entity/messages/messages.types';
import Messages from '@/entity/messages/messages';
import {IMessagesRepository} from '@/repository/messages/MessagesRepository.types';

export class MessagesRepository implements IMessagesRepository {
    async fetchAll(route: string): Promise<IMessages[]> {
        const response = await Api.get(`/messages/accounts/${route}`);
        const data = response.data as MessagesResponseType[];
        return data.map((message: MessagesResponseType) => new Messages(message));
    }
}
