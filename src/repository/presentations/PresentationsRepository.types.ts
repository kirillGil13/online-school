import IProductPresentations from '@/entity/materials/presentations/productsPresentation.types';

export interface IPresentationRepository {
    fetch(): Promise<IProductPresentations[]>;
}