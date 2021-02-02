import Vue from 'vue';
import {IFilters} from '@/entity/filters/filters.types';
import {FiltersStore} from '@/store/modules/Filters';

export default class Filters extends Vue {
    get filters(): IFilters[] {
        return FiltersStore.filters;
    }
    get periods(): IFilters[] {
        return FiltersStore.periods;
    }
    get courses(): IFilters[] {
        return FiltersStore.courses;
    }
    get candidates(): IFilters[] {
        return FiltersStore.candidates;
    }
    default: string[] = [];
    defaultPeriod: string[] = [];
    defaultCourse: string[] = [];
    defaultCandidate: string[] = [];
    constructor() {
        super();
        for (let i = 0; i < this.filters.length; i++) {
            this.default[i] = this.filters[i].filter[0];
        }
        for (let i = 0; i < this.periods.length; i++) {
            this.defaultPeriod[i] = this.periods[i].filter[0];
        }
        for (let i = 0; i < this.courses.length; i++) {
            this.defaultCourse[i] = this.courses[i].filter[0];
        }
        for (let i = 0; i < this.candidates.length; i++) {
            this.defaultCandidate[i] = this.candidates[i].filter[0];
        }

    }
}
