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
                    text: 'Не важно',
                    value: 0
                }
            ],
            filterType: FiltersNameEnum.Level
        },
        {
            id: 1,
            filterValue: [
                {
                    text: 'Не важно',
                    value: 0
                },
                {
                    text: '50 - 5000 ₽',
                    value: 1,
                    minCost: 50,
                    maxCost: 5000,
                },
                {
                    text: '5000 - 20 000 ₽',
                    value: 2,
                    minCost: 5000,
                    maxCost: 20000,
                },
                {
                    text: '20 000 - 50 000 ₽',
                    value: 3,
                    minCost: 20000,
                    maxCost: 50000,
                },
                {
                    text: 'выше 50 000 ₽',
                    value: 4,
                    minCost: 50000,
                },
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
                    value: 0
                }
            ],
            filterType: FiltersCourseNameEnum.Course
        },
        {
            id: 1,
            filterValue: [
                {
                    text: 'Все темы',
                    value: 0
                }
            ],
            filterType: FiltersCourseNameEnum.Theme
        },
        {
            id: 2,
            filterValue: [
                {
                    text: 'Не важно',
                    value: 0
                }
            ],
            filterType: FiltersCourseNameEnum.Level
        },
        {
            id: 3,
            filterValue: [
                {
                    text: 'Не важно',
                    value: 0
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
                    value: 0
                }
            ],
            filterType: FiltersCandidatesNameEnum.Status
        },
        {
            id: 1,
            filterValue: [
                {
                    text: 'Не важно',
                    value: 0
                },
                {
                    text: 'С инфопакетов',
                    value: 1,
                    isFiction: false,
                },
                {
                    text: 'Созданные вручную',
                    value: 2,
                    isFiction: true,
                },
            ],
            filterType: FiltersCandidatesNameEnum.Type
        },
        {
            id: 2,
            filterValue: [
                {
                    text: 'Не важно',
                    value: 0
                }
            ],
            filterType: FiltersCandidatesNameEnum.Product
        },

    ];

}

export const FiltersStore = getModule(FiltersModule);
