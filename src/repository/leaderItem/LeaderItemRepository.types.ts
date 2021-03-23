import {ILeaderItem} from '@/entity/leaderItem/leaderItem.types';

export interface ILeaderItemRepository {
    fetchData(route: string): Promise<ILeaderItem>;
}
