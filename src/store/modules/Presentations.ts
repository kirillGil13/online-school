import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {IPresentationsListItem} from '@/entity/presentations/presentations.types';

@Module({
    namespaced: true,
    name: 'presentations',
    store,
    dynamic: true,
})

class PresentationsModule extends VuexModule {
    presentations: IPresentationsListItem[] = [];

    @MutationAction
    async fetchAll(): Promise<{ presentations: IPresentationsListItem[] }> {
        const presentations = await store.$repository.presentations.fetchAll();
        return { presentations };
    }
}

export const PresentationsStore = getModule(PresentationsModule);
