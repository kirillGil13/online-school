import { ICandidate } from '@/entity/candidates';
import {CandidateFormRequestType} from '@/form/candidate/candidateForm.types';

export interface ICandidatesRepository {
    fetchAll(): Promise<ICandidate[]>;
    fetchFilteredData(data?: FormData): Promise<ICandidate[]>;
    create(data: CandidateFormRequestType): Promise<boolean>;
}
