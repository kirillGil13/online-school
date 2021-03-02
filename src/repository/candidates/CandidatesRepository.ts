import Api from '@/repository/api';
import { ICandidatesRepository } from '@/repository/candidates';
import { Candidate, CandidateResponseType, ICandidate } from '@/entity/candidates';
import {CandidateFormRequestType} from '@/form/candidate/candidateForm.types';

export class CandidatesRepository implements ICandidatesRepository {
    async fetchAll(): Promise<ICandidate[]> {
        const response = await Api.get('/candidates');
        const respData = response.data as CandidateResponseType[];
        return respData.map((candidate: CandidateResponseType) => new Candidate(candidate));
    }
    async fetchFilteredData(data?: FormData): Promise<ICandidate[]> {
        const response = await Api.getData({url: '/candidates', baseURL: process.env.VUE_APP_API_URL!}, data);
        const respData = response.data as CandidateResponseType[];
        return respData.map((candidate: CandidateResponseType) => new Candidate(candidate));
    }
    async create(data: CandidateFormRequestType): Promise<boolean> {
        const response = await Api.post('/candidates', data);
        const respData = response.data;
        return respData;
    }
}
