import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ILeaderItem} from '@/entity/leaderItem/leaderItem.types';

@Module({
    namespaced: true,
    name: 'leaderItem',
    store,
    dynamic: true,
})
class LeaderItemModule extends VuexModule {
    leaderItem: ILeaderItem | null = null;
    leaderItemLoaded = false;

    @MutationAction
    async fetchData(route: string): Promise<{ leaderItem: ILeaderItem; leaderItemLoaded: boolean }> {
        const leaderItem = await store.$repository.leaderItem.fetchData(route);
        let leaderItemLoaded = false;
        if (leaderItem) {
            leaderItemLoaded = true;
        }
        return {leaderItem, leaderItemLoaded};
    }
}

export const LeaderItemStore = getModule(LeaderItemModule);
