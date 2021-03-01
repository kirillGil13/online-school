import Api from '@/repository/api';
import { ICandidatesRepository } from '@/repository/candidates';
import { Candidate, CandidateResponseType, ICandidate } from '@/entity/candidates';
import {CandidateFormRequestType} from '@/form/candidate/candidateForm.types';

export class CandidatesRepository implements ICandidatesRepository {
    async fetchAll(data?: FormData): Promise<ICandidate[]> {
        console.log(data?.get('statusId'));
        const response = await Api.getData('/candidates', data);
        const respData = response.data as CandidateResponseType[];
        return respData.map((candidate: CandidateResponseType) => new Candidate(candidate));
    }
    async create(data: CandidateFormRequestType): Promise<boolean> {
        const response = await Api.post('/candidates', data);
        const respData = response.data;
        return respData;
    }
}
