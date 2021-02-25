import {IStatuses} from '@/entity/statuses/statuses.types';
import {StatusFormRequestType} from '@/form/status/statusForm.types';

export interface IStatusesRepository {
    fetchAll(): Promise<IStatuses[]>;
    create(data: StatusFormRequestType): Promise<IStatuses>;
}
