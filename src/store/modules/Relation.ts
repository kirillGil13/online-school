import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {RelationLikeDislikeRequestType} from '@/entity/common/relation.types';

@Module({
    namespaced: true,
    name: 'relation',
    store,
    dynamic: true,
})
class RelationModule extends VuexModule {

    @Action({rawError: true})
    async postFavourite(param: string): Promise<boolean> {
        const response = await store.$repository.relation.postFavourite(param.toString());
        return response;
    }

    @Action({rawError: true})
    async postLikeDislike(data: { param: string; relation: RelationLikeDislikeRequestType }): Promise<boolean> {
        const response = await store.$repository.relation.postLikeDislike(data.param.toString(), data.relation);
        return response;
    }

    @Action({rawError: true})
    async deleteFavourite(param: string): Promise<boolean> {
        const response = await store.$repository.relation.deleteFavourite(param.toString());
        return response;
    }

    @Action({rawError: true})
    async deleteLikeDislike(param: string): Promise<boolean> {
        const response = await store.$repository.relation.deleteLikeDislike(param);
        return response;
    }
}

export const RelationStore = getModule(RelationModule);
