import {ILeaderItem, LeaderItemResponseType} from '@/entity/leaderItem/leaderItem.types';

export default class LeaderItem implements ILeaderItem {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
    email: string;
    phoneNumber: string;

    constructor(data: LeaderItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.lastName = data.lastName;
        this.photoLink = data.photoLink;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
    }

    get fullName(): string {
        return this.name + ' ' + this.lastName;
    }
}
