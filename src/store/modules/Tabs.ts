import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ITabs} from '@/entity/tabs/tabs.types';
import {TrainingTabsNameEnum} from '@/entity/tabs/trainingTabs.types';
import {PresentationTabsNameEnum} from "@/entity/tabs/presentationTabs.types";


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

    presentationTabs: ITabs[] = [
        {
            id: 'product-presentation',
            title: 'Презентации по продуктам',
            isActive: true,
            component: PresentationTabsNameEnum.ProductPresentation,
        },
        {
            id: 'marketing-plans-presentation',
            title: 'Презентации по маркетинг-планам',
            isActive: false,
            component: PresentationTabsNameEnum.MarketingPlansPresentation,
        },
    ]
}

export const TabsStore = getModule(TabsModule);