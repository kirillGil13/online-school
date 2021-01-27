import { IPresentationRepository } from '@/repository/presentations/PresentationsRepository.types';
import IProductPresentations from '@/entity/materials/presentations/productsPresentation.types';
import Api from '@/repository/api';

export class PresentationsRepository implements IPresentationRepository {
    async fetch(): Promise<IProductPresentations[]> {
        const response = await Api.get('/v1/presentations')
        return response.data
    }
}