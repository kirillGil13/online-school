import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {
    FiltersCandidatesNameEnum,
    FiltersCourseNameEnum,
    FiltersNameEnum,
    IFilters
} from '@/entity/filters/filters.types';

@Module({
    namespaced: true,
    name: 'filters',
    store,
    dynamic: true,
})
class FiltersModule extends VuexModule {
    filters: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    text: 'Все темы',
                    value: null
                }
            ],
            filterType: FiltersNameEnum.Theme
        },
        {
            id: 1,
            filterValue: [
                {
                    text: 'Не важно',
                    value: null
                }
            ],
            filterType: FiltersNameEnum.Level
        },
        {
            id: 2,
            filterValue: [
                {
                    text: 'Не важно',
                    value: null
                }
            ],
            filterType: FiltersNameEnum.Cost
        },
    ];
    courses: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    text: 'Все курсы',
                    value: null
                }
            ],
            filterType: FiltersCourseNameEnum.Course
        },
        {
            id: 1,
            filterValue: [
                {
                    text: 'Все темы',
                    value: null
                }
            ],
            filterType: FiltersCourseNameEnum.Theme
        },
        {
            id: 2,
            filterValue: [
                {
                    text: 'Не важно',
                    value: null
                }
            ],
            filterType: FiltersCourseNameEnum.Level
        },
        {
            id: 3,
            filterValue: [
                {
                    text: 'Не важно',
                    value: null
                }
            ],
            filterType: FiltersCourseNameEnum.Cost
        },
    ];

    periods: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    text: 'Последние 30 дней',
                    value: 0
                },
                {
                    text: 'Последние 15 дней',
                    value: 1
                },
                {
                    text: 'Последние 5 дней',
                    value: 2
                },
            ],
            filterType: FiltersNameEnum.Period
        },
    ];
    candidates: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    text: 'Не важно',
                    value: null
                }
            ],
            filterType: FiltersCandidatesNameEnum.Status
        },
        {
            id: 1,
            filterValue: [
                {
                    text: 'Не важно',
                    value: null
                },
                {
                    text: 'С инфопакетов',
                    value: 0
                },
                {
                    text: 'Созданные вручную',
                    value: 1
                },
            ],
            filterType: FiltersCandidatesNameEnum.Type
        },
        {
            id: 2,
            filterValue: [
                {
                    text: 'Не важно',
                    value: null
                }
            ],
            filterType: FiltersCandidatesNameEnum.Product
        },

    ];

}

export const FiltersStore = getModule(FiltersModule);
