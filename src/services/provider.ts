import { IProvider } from './provider.types';
import { CandidatesService } from '@/services/candidates';

export const provider = (): IProvider => ({
    candidates: new CandidatesService(),
});

