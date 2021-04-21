import Api from '@/repository/api';
import {ISubscriptionRepository} from '@/repository/subscription/SubscriptionRespository.types';

export class SubscriptionRepository implements ISubscriptionRepository {
    async subscribe(): Promise<boolean> {
        const response = await Api.post('/subscriptions');
        const data = response.data;
        return data.result;
    }

    async delete(): Promise<boolean> {
        const response = await Api.delete('/subscriptions');
        const data = response.data;
        return data.result;
    }
}
