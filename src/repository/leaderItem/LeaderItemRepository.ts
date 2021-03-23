import Api from '@/repository/api';
import {ILeaderItemRepository} from '@/repository/leaderItem/LeaderItemRepository.types';
import {ILeaderItem, LeaderItemResponseType} from '@/entity/leaderItem/leaderItem.types';
import LeaderItem from '@/entity/leaderItem/leaderItem';

export class LeaderItemRepository implements ILeaderItemRepository {
    async fetchData(route: string): Promise<ILeaderItem> {
        const response = await Api.get(`/accounts/${route}`);
        const data = response.data as LeaderItemResponseType;
        return new LeaderItem(data);
    }
}
