import { getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
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
    unReadMessages = 0;

    @MutationAction
    async fetchAll(): Promise<{ dialogs: IDialogs[]; dialogsLoaded: boolean; unReadMessages: number }> {
        
        const dialogs = await store.$repository.dialogs.fetchAll();
        let dialogsLoaded = false;
        if (dialogs) {
            dialogsLoaded = true
        }
        const unReadMessages = dialogs.reduce((a, b) => a + b.countUnread, 0);
        console.log(unReadMessages)
        return { dialogs, dialogsLoaded, unReadMessages };
    }

    @Mutation
    setUnReadMessage(count: number = 1, operation: boolean): void {

        if(!operation) {
            this.unReadMessages += count;
        }else{
            this.unReadMessages -= count;
        }

        
    }

}

export const DialogsStore = getModule(DialogsModule);
