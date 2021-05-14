import Api from '@/repository/api';
import {ISubscriptionRepository} from '@/repository/subscription/SubscriptionRespository.types';
import {SubRequestType} from '@/entity/common/sub.types';

export class SubscriptionRepository implements ISubscriptionRepository {
    async subscribe(type: SubRequestType): Promise<string> {
        const response = await Api.post('/subscriptions/tinkoff', type);
        return response.data;
    }

    async delete(): Promise<boolean> {
        const response = await Api.delete('/subscriptions');
        const data = response.data;
        return data.result;
    }
}
