import { IProvider } from './provider.types';
import { CandidatesRepository } from '@/repository/candidates';
import { PartnersRepository } from '@/repository/partners';
import {PresentationsRepository} from '@/repository/presentations';

export const provider = (): IProvider => ({
    candidates: new CandidatesRepository(),
    partners: new PartnersRepository(),
    presentations: new PresentationsRepository()
});

