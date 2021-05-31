import Api from '@/repository/api';
import {IBalanceRepository} from '@/repository/balance/BalanceRepository.types';

export class BalanceRepository implements IBalanceRepository {
    async fetchData(): Promise<number> {
        const response = await Api.get('/accounts/balance');
        const data = response.data;
        return data;
    }
}
