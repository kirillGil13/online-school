import {IStatuses, StatusesResponseType} from '@/entity/statuses/statuses.types';

export default class Status implements IStatuses{
    id: number;
    photoLink: string;
    name: string;
    description: string;

    constructor(data: StatusesResponseType) {
        this.id = data.id;
        this.photoLink = data.photoLink;
        this.name = data.name;
        this.description = data.description;
    }
}
