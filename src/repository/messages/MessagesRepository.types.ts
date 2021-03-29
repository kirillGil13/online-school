import {IMessages} from '@/entity/messages/messages.types';

export interface IMessagesRepository {
    fetchAll(route: string): Promise<IMessages[]>;
}
