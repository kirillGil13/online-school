import Api from '@/repository/api';
import {IStatusesRepository} from '@/repository/statuses/Statuses.types';
import {IStatuses, StatusesRequestType, StatusesResponseType} from '@/entity/statuses/statuses.types';
import Status from '@/entity/statuses/statuses';
import {StatusFormRequestType} from '@/form/status/statusForm.types';
import {Candidate, CandidateResponseType, ICandidate} from '@/entity/candidates';

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
    async set(status: StatusesRequestType, candidateId: string): Promise<ICandidate> {
        const response = await Api.patch(`/candidates/${candidateId}`, status);
        const data = response.data as CandidateResponseType;
        return new Candidate(data);
    }
}
