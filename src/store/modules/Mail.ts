import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {MailFormRequestType} from '@/form/mail/mailForm.types';

@Module({
    namespaced: true,
    name: 'mail',
    store,
    dynamic: true,
})
class MailModule extends VuexModule {

    @Action
    async create(data: MailFormRequestType): Promise<boolean> {
        const response = await store.$repository.mail.send(data);
        return response;
    }

}

export const MailStore = getModule(MailModule);
