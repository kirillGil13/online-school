import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ITourOptions, ITourSteps} from '@/entity/common/tour.types';


@Module({
    namespaced: true,
    name: 'tour',
    store,
    dynamic: true,
})
class TourModule extends VuexModule {
    newUser = false;
    options: ITourOptions = {
        useKeyboardNavigation: false,
        labels: {
            buttonSkip: 'Пропустить',
            buttonPrevious: 'Назад',
            buttonNext: 'Вперед',
            buttonStop: 'Закончить',
        },
    }
    steps: ITourSteps[] = [
        {
            target: '#step-0',
            header: {
                title: '<strong>Onelinks</strong>'
            },
            content: 'Давайте проведем небольшой тур по нашему сервису'
        },
        {
            target: '#step-1',
            header: {
                title: '<strong>Раздел обучение</strong>'
            },
            content: 'Здесь Вы можете посмотреть все предлагаемые курсы'
        },
        {
            target: '#step-2',
            header: {
                title: '<strong>Раздел кандидаты</strong>'
            },
            content: 'Здесь находятся все Ваши кандидаты'
        },
        {
            target: '#step-3',
            header: {
                title: '<strong>Раздел инфопакеты</strong>'
            },
            content: 'Здесь представлены все Ваши инфопакеты'
        },
        {
            target: '#step-4',
            header: {
                title: '<strong>Раздел избранное</strong>'
            },
            content: 'Здесь находятся курсы, которые Вы добавили в избранное'
        },
    ];

    @Mutation
    setNewUser(): void {
        this.newUser = true;
    }
}

export const TourStore = getModule(TourModule);
