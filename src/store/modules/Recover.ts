import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {RecoverSendCodeRequestType} from '@/form/recover/recoverSendCode/recoverSendCodeForm.types';
import {RecoverCheckRequestType} from '@/form/recover/recoverCheck/recoverCheckForm.types';
import {RecoverDoRequestType} from '@/form/recover/recoverDo/recoverDoForm.types';

@Module({
    namespaced: true,
    name: 'recover',
    store,
    dynamic: true,
})
class RecoverModule extends VuexModule {

    @Action({rawError: true})
    async sendCode(data: RecoverSendCodeRequestType): Promise<boolean> {
        const response = await store.$repository.recover.sendCode(data);
        return response;
    }

    @Action({rawError: true})
    async checkCode(data: RecoverCheckRequestType): Promise<boolean> {
        const response = await store.$repository.recover.checkCode(data);
        return response;
    }

    @Action({rawError: true})
    async recoverDo(data: RecoverDoRequestType): Promise<boolean> {
        const response = await store.$repository.recover.recoverDo(data);
        return response;
    }
}

export const RecoverStore = getModule(RecoverModule);
