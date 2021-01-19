import { IProvider } from './provider.types';
import { CandidatesRepository } from '@/repository/candidates';
import { PartnersRepository } from '@/repository/partners';
import {UserUpdateRepository} from '@/repository/userUpdate';

export const provider = (): IProvider => ({
    candidates: new CandidatesRepository(),
    partners: new PartnersRepository(),
    userUpdate: new UserUpdateRepository()
});

