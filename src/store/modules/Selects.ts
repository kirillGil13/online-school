import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ISelect} from '@/entity/select/select.types';

@Module({
    namespaced: true,
    name: 'selects',
    store,
    dynamic: true,
})
class SelectsModule extends VuexModule {

    selectsActions: ISelect[] =[
        {
            id: 0,
            name: 'Стал клиентом',
        },
        {
            id: 1,
            name: 'Изменить',
            extraAction: true
        },
        {
            id: 2,
            name: 'Поместить в архив',
        },
    ];
    selectsComments: ISelect[] =[
        {
            id: 0,
            name: 'Изменить',
            extraAction: true
        },
        {
            id: 1,
            name: 'Удалить',
            extraAction: true
        },
    ];

    selectsDiscussion: ISelect[] =[
        {
            id: 0,
            name: 'Обсуждаемые',
        },
        {
            id: 1,
            name: 'Новые',
        },
        {
            id: 2,
            name: 'Старые',
        },
    ];
}

export const SelectsStore = getModule(SelectsModule);
