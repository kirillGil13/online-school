import Api from '@/repository/api';
import {IStatusesRepository} from '@/repository/statuses/Statuses.types';
import {IStatuses, StatusesResponseType} from '@/entity/statuses/statuses.types';
import Status from '@/entity/statuses/statuses';
import {StatusFormRequestType} from '@/form/status/statusForm.types';

export class StatusesRepository implements IStatusesRepository {
    async fetchAll(): Promise<IStatuses[]> {
        const response = await Api.get('/candidateStatuses');
        const data = response.data as StatusesResponseType[];
        return data.map((status: StatusesResponseType) => new Status(status));
    }
    async create(data: StatusFormRequestType): Promise<IStatuses> {
        const response = await Api.post('/candidateStatuses', data);
        const dataStatus = response.data as StatusesResponseType;
        return new Status(dataStatus);
    }
}
