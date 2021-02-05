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
            filter: [
                'Все темы',
            ],
            filterType: FiltersNameEnum.Theme
        },
        {
            id: 1,
            filter: [
                'Неважно',
                'Стартовый',
                'С опытом'
            ],
            filterType: FiltersNameEnum.Level
        },
        {
            id: 2,
            filter: [
                'Неважно',
                '50 - 5000 ₽',
                '5000 - 20 000 ₽',
                '20 000 - 50 000 ₽',
                'выше 50 000 ₽'
            ],
            filterType: FiltersNameEnum.Cost
        },
    ];
    courses: IFilters[] = [
        {
            id: 0,
            filter: [
                'Все курсы',
            ],
            filterType: FiltersCourseNameEnum.Course
        },
        {
            id: 1,
            filter: [
                'Все темы',
            ],
            filterType: FiltersCourseNameEnum.Theme
        },
        {
            id: 2,
            filter: [
                'Неважно',
                'Стартовый',
                'С опытом'
            ],
            filterType: FiltersCourseNameEnum.Level
        },
        {
            id: 3,
            filter: [
                'Неважно',
                '50 - 5000 ₽',
                '5000 - 20 000 ₽',
                '20 000 - 50 000 ₽',
                'выше 50 000 ₽'
            ],
            filterType: FiltersCourseNameEnum.Cost
        },
    ];

    periods: IFilters[] = [
        {
            id: 0,
            filter: [
                'Последние 30 дней',
                'Последние 15 дней',
                'Последние 5 дней'
            ],
            filterType: FiltersNameEnum.Period
        },
    ];
    candidates: IFilters[] = [
        {
            id: 0,
            filter: [
                'Неважно',
                'Новый клиент',
                'В ожидании',
                'Надо позвонить'
            ],
            filterType: FiltersCandidatesNameEnum.Status
        },
        {
            id: 1,
            filter: [
                'Неважно',
            ],
            filterType: FiltersCandidatesNameEnum.Type
        },
        {
            id: 2,
            filter: [
                'Неважно',
                'Недвижимость за 35%',
                'Авто за 35%'
            ],
            filterType: FiltersCandidatesNameEnum.Product
        },

    ];

}

export const FiltersStore = getModule(FiltersModule);
