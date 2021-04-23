import Api from '@/repository/api';
import { ICandidatesRepository } from '@/repository/candidates';
import {Candidate, CandidateResponseType, ICandidate} from '@/entity/candidates';
import {CandidateFormRequestType, CandidateStatusCount} from '@/form/candidate/candidateForm.types';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';
import {CodeRequestType} from '@/form/code/codeForm.types';
import {MONTHS} from '../../constants/month/index';

export class CandidatesRepository implements ICandidatesRepository {
    async fetchAll(data?: FormData): Promise<{[params: string]: ICandidate[]}> {
        const response = await Api.get('/candidates', {params: data, paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString()
            }});
        const respData = response.data as CandidateResponseType[];

        const candidateTodate: {[params: string]: ICandidate[]} =  {};
        const candidates = respData.map((candidate: CandidateResponseType) => new Candidate(candidate)).sort();
        const keys: string[] = [];

        candidates.forEach(el => {
            const key= el.createdAt.split(',')[0].trim();
            const month = MONTHS.find(month => key.split('.')[1].trim().includes(month.id.toString()) && month.value )
            const dateKey = `${key.split('.')[0]} ${month!.value}`;
            if(!keys.includes(dateKey)) {
                keys.push(dateKey)
            }
        })

        candidates.forEach(el => {
            const data = el.createdAt.split(',')[0];
            const dateKey = `${data.split('.')[0]} ${MONTHS.find(month => data.split('.')[1].trim().includes(month.id.toString()))!.value}`;

            if(keys.includes(dateKey)) {
                if(candidateTodate[dateKey]){
                    candidateTodate[dateKey].push(el)
                    return
                }else {
                    candidateTodate[dateKey] = [];
                    candidateTodate[dateKey].push(el)
                    return
                }
                
            }
        })


       
        return candidateTodate;
    }
    async create(data: CandidateFormRequestType): Promise<boolean> {
        const response = await Api.post('/candidates', data);
        const respData = response.data;
        return respData.result;
    }

    async delete(route: string): Promise<boolean> {
        const response = await Api.delete(`/candidates/${route}`);
        const respData = response.data;
        return respData.result;
    }

    async sendCode(data: PhoneRequestType): Promise<boolean> {
        const response = await Api.post('/candidates/confirmPhone/send', data);
        const respData = response.data;
        return respData.result;
    }
    async checkCode(data: CodeRequestType): Promise<boolean> {
        const response = await Api.post('/candidates/confirmPhone/do', data);
        const respData = response.data;
        return respData.result;
    }

    async takeCountStatus(data: CandidateStatusCount): Promise<number> {
        const responce = await Api.get(`/candidates/${data.status}/count`);
        const respData = responce.data;
        return respData;
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}
