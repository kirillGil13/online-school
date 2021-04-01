import {ICandidate} from '@/entity/candidates';
import {CandidateFormRequestType} from '@/form/candidate/candidateForm.types';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';
import {CodeRequestType} from '@/form/code/codeForm.types';

export interface ICandidatesRepository {
    fetchAll(data?: FormData): Promise<ICandidate[]>;
    create(data: CandidateFormRequestType): Promise<boolean>;
    sendCode(data: PhoneRequestType): Promise<boolean>;
    checkCode(data: CodeRequestType): Promise<boolean>;
}
