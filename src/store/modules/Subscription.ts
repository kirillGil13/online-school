import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {SubRequestType} from '@/entity/common/sub.types';

@Module({
    namespaced: true,
    name: 'subscription',
    store,
    dynamic: true,
})
class SubscriptionModule extends VuexModule {

    @Action({rawError: true})
    async subscribe(type: SubRequestType): Promise<string> {
        const result = await store.$repository.subscriptions.subscribe(type);
        console.log(result);
        return result;
    }

    @Action({rawError: true})
    async delete(): Promise<boolean> {
        const result = await store.$repository.subscriptions.delete();
        return result;
    }
}

export const SubscriptionStore = getModule(SubscriptionModule);
