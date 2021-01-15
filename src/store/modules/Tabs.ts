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
            id: 'home',
            title: 'Главная',
            isActive: true,
            component: TabsNameEnum.Main,
        },
        {
            id: 'courses',
            title: 'Курсы',
            isActive: false,
            component: TabsNameEnum.Courses,
        },
        {
            id: 'club',
            title: 'Клуб 100',
            isActive: false,
            component: TabsNameEnum.Club,
        },
        {
            id: 'leaders',
            title: 'Лидеры',
            isActive: false,
            component: TabsNameEnum.Leaders,
        },
    ];
}

export const TabsStore = getModule(TabsModule);