import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'purchase',
    store,
    dynamic: true,
})
class PurchaseModule extends VuexModule {

    @Action({rawError: true})
    async buyTinkoff(id: number): Promise<string> {
        const result = await store.$repository.purchase.buyTinkoff(id);
        return result;
    }
}

export const PurchaseStore = getModule(PurchaseModule);
