import {CompaniesResponseType, ICompaniesListItem} from '@/entity/companies/companies.types';
import {ILeader} from '@/entity/leader';
import Leader from '@/entity/leader/leader';

export class Company implements ICompaniesListItem {
    id: number;
    name: string;
    avatar: string;
    description: string;
    leaders: ILeader[] = [];
    constructor(data: CompaniesResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.avatar = data.avatar;
        this.description = data.description;
        for (let i = 0; i < data.leaders.length; i++) {
            this.leaders.push(new Leader(data.leaders[i]));
        }
    }
}
