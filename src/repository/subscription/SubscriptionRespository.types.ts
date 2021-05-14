import {SubRequestType} from '@/entity/common/sub.types';

export interface ISubscriptionRepository {
    subscribe(type: SubRequestType): Promise<string>;
    delete(): Promise<boolean>;
}
