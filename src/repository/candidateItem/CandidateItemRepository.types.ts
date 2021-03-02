import {ICandidateItem} from '@/entity/candidateItem/candidateItem.types';
import {UpdateCandidateFormRequestType} from '@/form/updateCandidate/updateCandiadteForm.types';
import {CallTimeFormRequestType} from '@/form/callTime/callTimeForm.types';

export interface ICandidateItemRepository {
    fetchData(candidateId: string): Promise<ICandidateItem>;
    update(data: UpdateCandidateFormRequestType, candidateId: string): Promise<ICandidateItem>;
    setCallTime(data: CallTimeFormRequestType, candidateId: string): Promise<ICandidateItem>;
}
