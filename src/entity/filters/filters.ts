import Vue from 'vue';
import {IFilters} from '@/entity/filters/filters.types';

export default class Filters extends Vue {
    default: number[] | null[] = [];
    constructor(data: IFilters[]) {
        super();
        for (let i = 0; i < data.length; i++) {
            this.default[i] = data[i].filterValue[0].value;
        }
    }
}
