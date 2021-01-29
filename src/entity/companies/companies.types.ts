import {ILeader, LeaderResponseType} from '@/entity/leader';

export interface ICompaniesListItem {
    id: number;
    name: string;
    avatar: string;
    description: string;
    leaders: ILeader[];
}

export type CompaniesResponseType = {
    id: number;
    name: string;
    avatar: string;
    description: string;
    leaders: LeaderResponseType[];
}
