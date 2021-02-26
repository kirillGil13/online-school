import {IStatuses, StatusesRequestType} from '@/entity/statuses/statuses.types';
import {StatusFormRequestType} from '@/form/status/statusForm.types';
import {ICandidate} from '@/entity/candidates';

export interface IStatusesRepository {
    fetchAll(): Promise<IStatuses[]>;
    create(data: StatusFormRequestType): Promise<IStatuses>;
    set(status: StatusesRequestType, candidateId: string): Promise<ICandidate>;
}
