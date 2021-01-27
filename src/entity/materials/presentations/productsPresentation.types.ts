import {IPresentationType} from '@/entity/materials/presentations/presentation.types';

interface IPresentationCategory {
    id: number;
    name: string;
    presentations: IPresentationType[];
}

export default interface IProductPresentations {
    id: number;
    name: string;
    subcategories: IPresentationCategory[];
}