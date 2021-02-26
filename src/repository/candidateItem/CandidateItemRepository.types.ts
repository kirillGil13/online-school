import {ICandidateItem} from '@/entity/candidateItem/candidateItem.types';
import {UpdateCandidateFormRequestType} from '@/form/updateCandidate/updateCandiadteForm.types';

export interface ICandidateItemRepository {
    fetchData(candidateId: string): Promise<ICandidateItem>;
    update(data: UpdateCandidateFormRequestType, candidateId: string): Promise<ICandidateItem>;
}
