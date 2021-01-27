import {IPresentationsListItem, IPresentationSubcategories, PresentationsListItemResponseType} from './presentations.types';

export default class PresentationsListItem implements IPresentationsListItem {
    id: number;
    name: string;
    subcategories: IPresentationSubcategories[] = [{
        id: 0,
        name: '',
        presentations: []
    }];

    constructor(data: PresentationsListItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        for (let i = 0; i < data.subcategories.length; i++) {
            this.subcategories.push({
                id: data.subcategories[i].id,
                name: data.subcategories[i].name,
                presentations: data.subcategories[i].presentations,
            });
        }
    }
}
