import {ILeadersListItem, LeadersListItemResponseType} from '@/entity/leader/leader.types';

export default class LeadersListItem implements ILeadersListItem {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
    constructor(data: LeadersListItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.lastName = data.lastName;
        this.photoLink = data.photoLink;
    }
    get fullName(): string {
        return this.name + ' ' + this.lastName;
    }
}
