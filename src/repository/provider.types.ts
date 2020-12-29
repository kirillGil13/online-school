import { ICandidatesRepository } from '@/repository/candidates';
import { IPartnersRepository } from '@/repository/partners';

export interface IProvider {
    candidates: ICandidatesRepository;
    partners: IPartnersRepository;
}
