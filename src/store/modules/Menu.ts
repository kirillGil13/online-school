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
            title: 'Обучение',
            iconName: 'Education',
            route: RouterNameEnum.TrainingMain,
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

    footerMenu: IMainMenu[] = [
        {
            title: 'Политика конфиденциальности',
            route: RouterNameEnum.PrivacyPolicy,
        },
        {
            title: 'Обработка персональных данных',
            route: RouterNameEnum.PersonalData,
        },
        {
            title: 'Пользовательское соглашение',
            route: RouterNameEnum.TermsOfUse,
        },
        {
            title: 'Соглашение с условиями подписки',
            route: RouterNameEnum.TermsOfSubscription,
        },
    ]
}

export const MenuStore = getModule(MenuModule);
