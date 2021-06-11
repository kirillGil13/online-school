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
            iconName: 'Education_Mobile',
            route: RouterNameEnum.TrainingMain,
        },
        {
            title: 'Задачи',
            iconName: 'Todo_list',
            extraAction: true,
            route: RouterNameEnum.TodoList,
        },
        {
            title: 'Кандидаты',
            iconName: 'Candidates_Mobile',
            route: RouterNameEnum.Candidates,
        },
        {
            title: 'Инфопакеты',
            iconName: 'InfoPack_Mobile',
            route: RouterNameEnum.InfoPackages,
        },
        {
            title: 'Чат',
            iconName: 'Chat_Mobile',
            route: RouterNameEnum.Chat
        },
        {
            title: 'Избранное',
            iconName: 'Chosen_Outline',
            route: RouterNameEnum.Chosen,
        },
        {
            title: 'Кабинет лидера',
            iconName: 'Cabinet_Outline',
            route: RouterNameEnum.Cabinet,
        },
    ];

    bottomMenu: IMainMenu[] = [
        {
            title: 'Обучение',
            iconName: 'Education_Mobile',
            extraAction: false,
            route: RouterNameEnum.TrainingMain,
        },
        {
            title: 'Инфопакеты',
            iconName: 'Candidates_Mobile',
            extraAction: false,
            route: RouterNameEnum.InfoPackages,
        },
        {
            iconName: 'Universal',
            extraAction: true,
        },
        {
            title: 'Кандидаты',
            iconName: 'InfoPack_Mobile',
            extraAction: false,
            route: RouterNameEnum.Candidates,
        },
        {
            title: 'Поддержка',
            extraAction: true,
            iconName: 'Intercom_Mobile'
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
