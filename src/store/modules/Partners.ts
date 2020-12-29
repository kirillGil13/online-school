import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { IPartner } from '@/entity/partners';

@Module({
    namespaced: true,
    name: 'partners',
    store,
    dynamic: true,
})
class PartnersModule extends VuexModule {
    partners: IPartner[] = [];

    @MutationAction
    async fetchAll(): Promise<{ partners: IPartner[] }> {
        const partners = await store.$repository.partners.fetchAll();
        return { partners };
    }
}

export const PartnersStore = getModule(PartnersModule);
