import Api from '@/repository/api';
import { IRewiewsRepository } from './RewiewsRepository.types';
import { IRewiews, RewiewsResponseType } from '@/entity/rewiews/rewiews.types';
import Rewiews from '@/entity/rewiews/rewiews';

export class RewiewsRepository implements IRewiewsRepository {
    async fetchAll(id: number): Promise<IRewiews[]> {
        const response = await Api.get(`/core/v1/reviews/courses/${id}`);
        const data = response.data as RewiewsResponseType[];
        return data.map((rewiew: RewiewsResponseType) => new Rewiews(rewiew));
    }
}
