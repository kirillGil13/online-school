import Api from '@/repository/api';
import {ICandidateItemRepository} from '@/repository/candidateItem/CandidateItemRepository.types';
import {CandidateItemResponseType, ICandidateItem} from '@/entity/candidateItem/candidateItem.types';
import {CandidateItem} from '@/entity/candidateItem/candidateItem';
import {UpdateCandidateFormRequestType} from '@/form/updateCandidate/updateCandiadteForm.types';

export class CandidateItemRepository implements ICandidateItemRepository {
    async fetchData(candidateId: string): Promise<ICandidateItem> {
        const response = await Api.get(`/candidates/${candidateId}`);
        const data = response.data as CandidateItemResponseType;
        return new CandidateItem(data);
    }
    async update(data: UpdateCandidateFormRequestType, candidateId: string): Promise<ICandidateItem> {
        const response = await Api.patch(`/candidates/${candidateId}`, data);
        const respData = response.data;
        return respData;
    }
}