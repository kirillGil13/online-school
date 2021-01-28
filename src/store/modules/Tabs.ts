import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ITabs} from '@/entity/tabs/tabs.types';
import {TrainingTabsNameEnum} from '@/entity/tabs/trainingTabs.types';
import {PresentationTabsNameEnum} from '@/entity/tabs/presentationTabs.types';


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
    ]
}

export const TabsStore = getModule(TabsModule);