import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ConfirmEmailRequestType, ConfirmEmailSendCodeRequestType} from '@/entity/common/confirmEmail.types';

@Module({
    namespaced: true,
    name: 'confirmEmail',
    store,
    dynamic: true,
})
class ConfirmEmailModule extends VuexModule {

    @Action({ rawError: true })
    async sendCode(data: ConfirmEmailSendCodeRequestType): Promise<boolean> {
        const res = await store.$repository.confirmEmail.sendCode(data);
        return res;
    }

    @Action({ rawError: true })
    async confirm(data: ConfirmEmailRequestType): Promise<boolean> {
        const res = await store.$repository.confirmEmail.confirm(data);
        return res;
    }
}

export const ConfirmEmailStore = getModule(ConfirmEmailModule);
