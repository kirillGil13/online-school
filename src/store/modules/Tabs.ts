import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ITabs} from '@/entity/tabs/tabs.types';
import {TrainingTabsNameEnum} from '@/entity/tabs/trainingTabs.types';
import {PresentationTabsNameEnum} from '@/entity/tabs/presentationTabs.types';
import {OrganizationTabsNameEnum} from '@/entity/tabs/organizationTabs.types';
import {ProfileTabsNameEnum} from '@/entity/tabs/profileTabs.types';
import {TodoTabsNameEnum} from '@/entity/tabs/todoTabs.types';


@Module({
    namespaced: true,
    name: 'tabs',
    store,
    dynamic: true,
})
class TabsModule extends VuexModule {
    trainingTabs: ITabs[] = [
        {
            id: '',
            title: 'Главная',
            filter: false,
            component: TrainingTabsNameEnum.Main,
        },
        {
            id: 'courses',
            title: 'Курсы',
            filter: false,
            component: TrainingTabsNameEnum.Courses,
        },
        {
            id: 'club',
            title: 'Клуб 100',
            filter: false,
            component: TrainingTabsNameEnum.Club,
        },
        {
            id: 'leaders',
            title: 'Лидеры',
            filter: true,
            component: TrainingTabsNameEnum.Leaders,
        },
    ];

    presentationTabs: ITabs[] = [
        {
            id: 'product-presentation',
            title: 'Презентации по продуктам',
            filter: false,
            component: PresentationTabsNameEnum.ProductPresentation,
        },
        {
            id: 'marketing-plans-presentation',
            title: 'Презентации по маркетинг-планам',
            filter: false,
            component: PresentationTabsNameEnum.MarketingPlansPresentation,
        },
    ];

    profileTabs: ITabs[] = [
        {
            id: 0,
            title: 'Общие',
            filter: false,
            component: ProfileTabsNameEnum.ProfileMain,
        },
        {
            id: 1,
            title: 'Контактные данные',
            filter: false,
            component: ProfileTabsNameEnum.ProfileContact,
        },
        {
            id: 2,
            title: 'Подписки',
            filter: false,
            component: ProfileTabsNameEnum.ProfileSubs,
        },
        {
            id: 3,
            title: 'Документы',
            filter: false,
            component: ProfileTabsNameEnum.ProfileDocuments,
        },
    ];
    organizationTabs: ITabs[] = [
        {
            id: 'main',
            title: 'Главная',
            filter: false,
            component: OrganizationTabsNameEnum.OrganizationMain
        },
        {
            id: 'training',
            title: 'Обучение',
            filter: false,
            component: OrganizationTabsNameEnum.OrganizationTraining
        },
        {
            id: 'presentations',
            title: 'Презентации',
            filter: false,
            component: OrganizationTabsNameEnum.OrganizationPresentations
        },
        {
            id: 'info-packages',
            title: 'Инфопакеты',
            filter: false,
            component: OrganizationTabsNameEnum.OrganizationInfoPackages
        },
        {
            id: 'documents',
            title: 'Документы',
            filter: false,
            component: OrganizationTabsNameEnum.OrganizationDocuments
        },
        {
            id: 'instructions',
            title: 'Инструкции',
            filter: false,
            component: OrganizationTabsNameEnum.OrganizationInstructions
        },
        {
            id: 'leaders',
            title: 'Лидеры',
            filter: false,
            component: OrganizationTabsNameEnum.OrganizationLeaders
        },
        {
            id: 'group',
            title: 'Сообщество',
            filter: false,
            component: OrganizationTabsNameEnum.OrganizationGroup
        },

    ];

    todoTabs: ITabs[] = [
        {
            id: 'income',
            title: 'Входящие',
            filter: false,
            iconName: 'Income',
            component: TodoTabsNameEnum.TodoIncome
        },
        {
            id: 'today',
            title: 'Сегодня',
            filter: false,
            iconName: 'Star_small',
            component: TodoTabsNameEnum.TodoToday
        },
        {
            id: 'plans',
            title: 'Планы',
            filter: false,
            iconName: 'Plans',
            component: TodoTabsNameEnum.TodoPlans
        },
        {
            id: 'any_times',
            title: 'В любое время',
            filter: false,
            iconName: 'Any_times',
            component: TodoTabsNameEnum.TodoAnyTimes
        },
        {
            id: 'some_day',
            title: 'Когда-нибудь',
            filter: false,
            iconName: 'Box',
            component: TodoTabsNameEnum.TodoSomeDay
        },
        {
            id: 'journal',
            title: 'Журнал',
            filter: false,
            iconName: 'Archive',
            component: TodoTabsNameEnum.TodoJournal
        },
    ]
}

export const TabsStore = getModule(TabsModule);


