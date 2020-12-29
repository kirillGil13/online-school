import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import { IMainMenu } from '@/entity/menu';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'creditor',
    store,
    dynamic: true,
})
class MenuModule extends VuexModule {
    items: IMainMenu[] = [
        {
            title: 'Главная',
            iconName: 'Home',
            route: 'Main',
        },
        {
            title: 'Обучение',
            iconName: 'Education',
            route: 'Main',
        },
        {
            title: 'Материалы',
            iconName: 'Folder',
            route: 'Main',
        },
        {
            title: 'События',
            iconName: 'Calendar',
            route: 'Main',
        },
        {
            title: 'Чат',
            iconName: 'Chat',
            route: 'Main',
        },
        {
            title: 'Кандидаты',
            iconName: 'Add_User',
            route: 'Candidates',
        },
        {
            title: 'Партнеры',
            iconName: 'Users',
            route: 'Main',
        },
    ];
}

export const MenuStore = getModule(MenuModule);
