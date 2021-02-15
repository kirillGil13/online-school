import {ISelect, ISelectItems} from '@/entity/select/select.types';

export default class Select implements ISelect{
    id: number;
    items: ISelectItems[] = [];

    constructor(data: ISelect) {
        this.id = data.id;
        for (let i = 0; i < data.items.length; i++) {
            this.items.push(data.items[i]);
        }
    }
}