import {ISelect} from '@/entity/select/select.types';

export default class Select implements ISelect{
    id: number;
    photoLink?: string;
    name: string;
    extraAction?: boolean;

    constructor(data: ISelect) {
        this.id = data.id;
        this.photoLink = data.photoLink;
        this.name = data.name;
        this.extraAction = data.extraAction;
    }
}