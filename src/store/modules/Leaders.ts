import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ILeadersListItem} from '@/entity/leader';

@Module({
    namespaced: true,
    name: 'leaders',
    store,
    dynamic: true,
})
class LeadersModule extends VuexModule {
    leaders: ILeadersListItem[] = [];
    leadersLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ leaders: ILeadersListItem[]; leadersLoaded: boolean }> {
        const leaders = await store.$repository.leaders.fetchAll();
        let leadersLoaded = false;
        if (leaders) {
            leadersLoaded = true;
        }
        return {leaders, leadersLoaded};
    }
}

export const LeadersStore = getModule(LeadersModule);
