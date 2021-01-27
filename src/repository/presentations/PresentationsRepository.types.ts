import {IPresentationsListItem} from '@/entity/presentations/presentations.types';

export interface IPresentationsRepository {
    fetchAll(): Promise<IPresentationsListItem[]>;
}
