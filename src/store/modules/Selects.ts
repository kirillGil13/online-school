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
            name: 'Сделать партнером',
        },
        {
            id: 1,
            name: 'Создать действие',
        },
        {
            id: 2,
            name: 'Изменить',
        },
        {
            id: 3,
            name: 'Поместить в архив',
        },
    ]
}

export const SelectsStore = getModule(SelectsModule);
