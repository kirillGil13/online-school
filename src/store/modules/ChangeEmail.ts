import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ConfirmEmailRequestType} from '@/entity/common/confirmEmail.types';
import {ChangeEmailRequestType} from '@/form/changeEmail/changeEmail.types';

@Module({
    namespaced: true,
    name: 'changeEmail',
    store,
    dynamic: true,
})
class ChangeEmailModule extends VuexModule {

    @Action({ rawError: true })
    async sendCode(data: ChangeEmailRequestType): Promise<boolean> {
        const res = await store.$repository.changeEmail.sendCode(data);
        return res;
    }

    @Action({ rawError: true })
    async confirm(data: ConfirmEmailRequestType): Promise<boolean> {
        const res = await store.$repository.changeEmail.confirm(data);
        return res;
    }
}

export const ChangeEmailStore = getModule(ChangeEmailModule);
