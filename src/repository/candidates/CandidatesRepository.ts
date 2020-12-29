import Api from '@/repository/api';
import { ICandidatesService } from '@/repository/candidates';
import { Candidate, CandidateResponseType, ICandidate } from '@/entity/candidates';

export class CandidatesRepository implements ICandidatesService {
    async fetchAll(): Promise<ICandidate[]> {
        const response = await Api.get('/user/candidates');
        const data = response.data as CandidateResponseType[];
        return data.map((candidate: CandidateResponseType) => new Candidate(candidate));
    }
}