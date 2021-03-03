import Api from '@/repository/api';
import {ILeadersRepository} from '@/repository/leaders/LeadersRepository.types';
import {ILeadersListItem, LeadersListItemResponseType} from '@/entity/leader';
import LeadersListItem from '@/entity/leader/leader';

export class LeadersRepository implements ILeadersRepository {
    async fetchAll(): Promise<ILeadersListItem[]> {
        const response = await Api.get('/accounts/leaders');
        const data = response.data as LeadersListItemResponseType[];
        return data.map((leader: LeadersListItemResponseType) => new LeadersListItem(leader));
    }
}