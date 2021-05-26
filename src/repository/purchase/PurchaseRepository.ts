import Api from '@/repository/api';
import {IPurchaseRepository} from '@/repository/purchase/PurchaseRepository.types';

export class PurchaseRepository implements IPurchaseRepository {
    async buyTinkoff(id: number): Promise<string> {
        const response = await Api.post(`/purchases/courses/${id}/tinkoff`);
        const data = response.data;
        return data;
    }
}
