import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ITabs} from '@/entity/tabs/tabs.types';

@Module({
    namespaced: true,
    name: 'tabs',
    store,
    dynamic: true,
})
class TabsModule extends VuexModule {
    tabs: ITabs[] = [
        {
            id: 'home',
            title: 'Главная',
            isActive: true,
            component: '',
        },
        {
            id: 'courses',
            title: 'Курсы',
            isActive: false,
            component: 'TrainingCourses',
        },
        {
            id: 'club',
            title: 'Клуб 100',
            isActive: false,
            component: '',
        },
        {
            id: 'leaders',
            title: 'Лидеры',
            isActive: false,
            component: '',
        },
    ];
}

export const TabsStore = getModule(TabsModule);