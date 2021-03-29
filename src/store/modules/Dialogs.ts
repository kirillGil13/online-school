import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {IDialogs} from '@/entity/dialogs/dialogs.types';

@Module({
    namespaced: true,
    name: 'dialogs',
    store,
    dynamic: true,
})
class DialogsModule extends VuexModule {
    dialogs: IDialogs[] = [];
    dialogsLoaded = false;

    @MutationAction
    async fetchAll(): Promise<{ dialogs: IDialogs[]; dialogsLoaded: boolean }> {
        const dialogs = await store.$repository.dialogs.fetchAll();
        let dialogsLoaded = false;
        if (dialogs) {
            dialogsLoaded = true
        }
        return { dialogs, dialogsLoaded };
    }
}

export const DialogsStore = getModule(DialogsModule);
