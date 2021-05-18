import {getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IPictureUpload, PictureUploadRequestType} from '@/entity/common/pictureUpload.types';

@Module({
    namespaced: true,
    name: 'pictureUpload',
    store,
    dynamic: true,
})
class PictureUploadModule extends VuexModule {
    pictureUpload: IPictureUpload | null = null;
    pictureUploadLoaded = false;

    @Mutation
    clear(): void {
        this.pictureUpload = null;
        this.pictureUploadLoaded = false;
    }

    @MutationAction
    async set( data: PictureUploadRequestType): Promise<{ pictureUpload: IPictureUpload; pictureUploadLoaded: boolean }> {
        const formData = new FormData();
        formData.append('file', data.file);
        const pictureUpload = await store.$repository.pictureUpload.set(formData);
        let pictureUploadLoaded = false;
        if (pictureUpload) {
            pictureUploadLoaded = true;
        }
        return { pictureUpload , pictureUploadLoaded};
    }
}

export const PictureUploadStore = getModule(PictureUploadModule);
