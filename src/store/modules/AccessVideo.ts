import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ICandidateItem} from '@/entity/candidateItem/candidateItem.types';
import {VideoAccessFormRequestType} from '@/form/videoAccess/videoAccessForm.types';

@Module({
    namespaced: true,
    name: 'access',
    store,
    dynamic: true,
})
class AccessVideoModule extends VuexModule {

    @Action({rawError: true})
    async getAccess(data: VideoAccessFormRequestType): Promise<ICandidateItem> {
        const response = await store.$repository.videoAccess.getAccess(data);
        return response;
    }
}

export const AccessVideoStore = getModule(AccessVideoModule);