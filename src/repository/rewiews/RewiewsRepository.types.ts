import { IRewiews } from '@/entity/rewiews/rewiews.types';

export interface IRewiewsRepository {
    fetchAll(id: number): Promise<IRewiews[]>;
}
