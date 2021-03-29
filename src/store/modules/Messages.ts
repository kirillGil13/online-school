import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {IMessages} from '@/entity/messages/messages.types';

@Module({
    namespaced: true,
    name: 'messages',
    store,
    dynamic: true,
})
class MessagesModule extends VuexModule {
    messages: IMessages[] = [];
    messagesLoaded = false;

    @MutationAction
    async fetchAll(route: string): Promise<{ messages: IMessages[]; messagesLoaded: boolean }> {
        const messages = await store.$repository.messages.fetchAll(route);
        let messagesLoaded = false;
        if (messages) {
            messagesLoaded = true
        }
        return { messages, messagesLoaded };
    }
}

export const MessagesStore = getModule(MessagesModule);
