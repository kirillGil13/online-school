import { ICandidatesRepository } from '@/repository/candidates';
import { IPartnersRepository } from '@/repository/partners';
import {IPresentationRepository} from '@/repository/presentations';

export interface IProvider {
    candidates: ICandidatesRepository;
    partners: IPartnersRepository;
    presentations: IPresentationRepository;
}
