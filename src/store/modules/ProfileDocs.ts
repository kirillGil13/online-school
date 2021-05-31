import { getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IProfileDocs} from '@/entity/profileDocs/profileDocs.types';
import {ProfileDocumentsRequestType} from '@/form/profile/documents/profileDocumentsForm.types';

@Module({
    namespaced: true,
    name: 'profileDocs',
    store,
    dynamic: true,
})
class ProfileDocsModule extends VuexModule {
    profileDocs: IProfileDocs | null  = null;
    profileDocsLoaded = false;

    @MutationAction
    async fetchData(): Promise<{profileDocs: IProfileDocs; profileDocsLoaded: boolean}> {
        const profileDocs = await store.$repository.profileDocs.fetchData();
        let profileDocsLoaded = false;
        if (profileDocs) {
            profileDocsLoaded = true;
        }
        return { profileDocs, profileDocsLoaded };
    }

    @MutationAction
    async changeDoc(data: ProfileDocumentsRequestType): Promise<{profileDocs: IProfileDocs}> {
        const profileDocs = await store.$repository.profileDocs.changeDoc(data);
        return {profileDocs};
    }
}

export const ProfileDocsStore = getModule(ProfileDocsModule);
