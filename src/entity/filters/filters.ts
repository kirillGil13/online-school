import Vue from 'vue';
import {IFilters} from '@/entity/filters/filters.types';
import {FiltersStore} from '@/store/modules/Filters';

export default class Filters extends Vue {
    get filters(): IFilters[] {
        return FiltersStore.filters;
    }
    default: string[] = [];
    constructor() {
        super();
        for (let i = 0; i < this.filters.length; i++) {
            this.default[i] = this.filters[i].filter[0];
        }
    }
}