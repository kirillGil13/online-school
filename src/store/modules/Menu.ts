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
            title: 'Чат',
            iconName: 'Chat',
            route: RouterNameEnum.ChatMain,
        },
        {
            title: 'Кандидаты',
            iconName: 'Add_User',
            route: RouterNameEnum.Candidates,
        },
        {
            title: 'Инфопакеты',
            iconName: 'Users',
            route: RouterNameEnum.InfoPackages,
        },
        {
            title: 'Я изучаю',
            iconName: 'Education',
            route: RouterNameEnum.MyStudies,
        },
        {
            title: 'Избранное',
            iconName: 'Chosen',
            route: RouterNameEnum.Chosen,
        },
        {
            title: 'Кабинет лидера',
            iconName: 'Cabinet',
            route: RouterNameEnum.Cabinet,
        },
    ];
}

export const MenuStore = getModule(MenuModule);
