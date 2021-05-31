import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'balance',
    store,
    dynamic: true,
})
class BalanceModule extends VuexModule {
    balance: number | null = null;

    @MutationAction
    async fetchData(): Promise<{balance: number}> {
        const balance = await store.$repository.balance.fetchData();
        return { balance };
    }
}

export const BalanceStore = getModule(BalanceModule);
