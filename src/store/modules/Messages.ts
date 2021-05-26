import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {IMessages, MessagesResponseType} from '@/entity/messages/messages.types';
import Messages from '@/entity/messages/messages';


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

    @Mutation
    addMessage(message: MessagesResponseType): void {
        console.log(new Messages(message))
        this.messages.push(new Messages(message))
    }
}

export const MessagesStore = getModule(MessagesModule);
