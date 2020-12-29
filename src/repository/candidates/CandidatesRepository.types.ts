import { ICandidate } from '@/entity/candidates';

export interface ICandidatesRepository {
    fetchAll(): Promise<ICandidate[]>;
}
