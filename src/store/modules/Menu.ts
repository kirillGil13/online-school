import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import { IMainMenu } from '@/entity/menu';
import store from '@/store';
import {RouterNameEnum} from '@/router/router.types';

@Module({
    namespaced: true,
    name: 'menu',
    store,
    dynamic: true,
})
class MenuModule extends VuexModule {
    items: IMainMenu[] = [
        {
            title: 'Главная',
            iconName: 'Home',
            route: RouterNameEnum.Main,
        },
        {
            title: 'Обучение',
            iconName: 'Education',
            route: RouterNameEnum.TrainingMain,
        },
        {
            title: 'События',
            iconName: 'Calendar',
            route: RouterNameEnum.Calendar,
        },
        {
            title: 'Чат',
            iconName: 'Chat',
            route: RouterNameEnum.Chat,
        },
        {
            title: 'Кандидаты',
            iconName: 'Add_User',
            route: RouterNameEnum.Candidates,
        },
        {
            title: 'Партнеры',
            iconName: 'Users',
            route: RouterNameEnum.Partners,
        },
    ];
}

export const MenuStore = getModule(MenuModule);
