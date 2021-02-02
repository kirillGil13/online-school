import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ISelect, SelectStatusNameEnum} from '@/entity/select/select.types';

@Module({
    namespaced: true,
    name: 'selects',
    store,
    dynamic: true,
})
class SelectsModule extends VuexModule {
    selectsStatus: ISelect =
        {
            id: 0,
            items: [
                {
                    id: 0,
                    title: 'Новый клиент',
                    icon: true,
                    iconName: SelectStatusNameEnum.Client
                },
                {
                    id: 1,
                    title: 'В ожидании',
                    icon: true,
                    iconName: SelectStatusNameEnum.Waiting
                },
                {
                    id: 2,
                    title: 'Надо позвонить',
                    icon: true,
                    iconName: SelectStatusNameEnum.Call
                },
            ]
        };
    selectsActions: ISelect =
        {
            id: 0,
            items: [
                {
                    id: 0,
                    title: 'Сделать партнером',
                    icon: false,
                },
                {
                    id: 0,
                    title: 'Создать действие',
                    icon: false,
                },
                {
                    id: 0,
                    title: 'Изменить',
                    icon: false,
                },
                {
                    id: 0,
                    title: 'Удалить',
                    icon: false,
                },

            ]
        };

}

export const SelectsStore = getModule(SelectsModule);
