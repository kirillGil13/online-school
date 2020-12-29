import { ICandidate } from '@/entity/candidates';

export interface ICandidatesService {
    fetchAll(): Promise<ICandidate[]>;
}
