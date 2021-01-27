import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ITabs, TabsNameEnum} from '@/entity/tabs/tabs.types';

@Module({
    namespaced: true,
    name: 'tabs',
    store,
    dynamic: true,
})
class TabsModule extends VuexModule {
    tabs: ITabs[] = [
        {
            id: '',
            title: 'Главная',
            filter: false,
            component: TabsNameEnum.Main,
        },
        {
            id: 'courses',
            title: 'Курсы',
            filter: false,
            component: TabsNameEnum.Courses,
        },
        {
            id: 'club',
            title: 'Клуб 100',
            filter: false,
            component: TabsNameEnum.Club,
        },
        {
            id: 'leaders',
            title: 'Лидеры',
            filter: true,
            component: TabsNameEnum.Leaders,
        },
    ];
}

export const TabsStore = getModule(TabsModule);