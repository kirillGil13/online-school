import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IMyStatistic, MyStatisticRequestType} from '@/entity/myStatistic/myStatistic.types';

@Module({
    name: 'myStatistic',
    namespaced: true,
    dynamic: true,
    store
})
class MyStatisticModule extends VuexModule{
    myStatistic: IMyStatistic | null = null;
    myStatisticLoaded = false;

    @MutationAction
    async fetchData(data?: MyStatisticRequestType): Promise<{ myStatistic: IMyStatistic; myStatisticLoaded: boolean }> {
        const myStatistic = await store.$repository.myStatistic.fetchData(data);
        let myStatisticLoaded = false;
        if (myStatistic) {
            myStatisticLoaded = true;
        }
        return { myStatistic, myStatisticLoaded }
    }
}

export const MyStatisticStore = getModule(MyStatisticModule);
