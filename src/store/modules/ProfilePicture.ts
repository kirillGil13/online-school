import {getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IProfilePicture, ProfilePictureRequestType} from '@/entity/common/profilePicture.types';

@Module({
    namespaced: true,
    name: 'profilePicture',
    store,
    dynamic: true,
})
class ProfilePictureModule extends VuexModule {
    profilePicture: IProfilePicture | null = null;
    profilePictureLoaded = false;

    @Mutation
    clear(): void {
        this.profilePicture = null;
        this.profilePictureLoaded = false;
    }

    @MutationAction
    async set( data: ProfilePictureRequestType): Promise<{ profilePicture: IProfilePicture; profilePictureLoaded: boolean }> {
        const formData = new FormData();
        formData.append('file', data.file);
        const profilePicture = await store.$repository.profilePicture.set(formData);
        let profilePictureLoaded = false;
        if (profilePicture) {
            profilePictureLoaded = true;
        }
        return { profilePicture , profilePictureLoaded};
    }
}

export const ProfilePictureStore = getModule(ProfilePictureModule);
