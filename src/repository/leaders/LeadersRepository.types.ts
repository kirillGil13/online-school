import {ILeadersListItem} from '@/entity/leader';

export interface ILeadersRepository {
    fetchAll(): Promise<ILeadersListItem[]>;
}
