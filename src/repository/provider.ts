import { IProvider } from './provider.types';
import { CandidatesRepository } from '@/repository/candidates';

export const provider = (): IProvider => ({
    candidates: new CandidatesRepository(),
});

