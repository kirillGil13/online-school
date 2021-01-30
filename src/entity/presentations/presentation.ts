import {
    IPresentation,
    IPresentationCategory,
    PresentationCategoryResponseType
} from '@/entity/presentations/presentation.types';

export default class Presentation implements IPresentationCategory {
    id: number;
    name: string;
    presentations: IPresentation[] = [];

    constructor(data: PresentationCategoryResponseType) {
        this.id = data.id;
        this.name = data.name;
        for (let i = 0; i < data.presentations.length; i++) {
            this.presentations.push(data.presentations[i]);
        }
    }
}