import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {PaginationRequestType} from '@/entity/common/pagination.types';
import {IWithdraw} from '@/entity/withdraw/withdraw.types';
import {WithDrawRequestType} from '@/form/withDraw/withDrawForm.types';

@Module({
    namespaced: true,
    name: 'withdraws',
    store,
    dynamic: true,
})
class WithdrawsModule extends VuexModule {
    withdraws: IWithdraw[] = [];
    withdrawsLoaded = false;

    @Mutation
    clear(): void {
        this.withdraws = []
        this.withdrawsLoaded = false;
    }

    @Mutation
    setWithdraws(data: {withdraws: IWithdraw[]; withdrawsLoaded: boolean; scroll: boolean}): void {
        if (!data.scroll) {
            this.withdraws = data.withdraws;
        } else {
            this.withdraws = this.withdraws.concat(data.withdraws);
        }
        this.withdrawsLoaded = data.withdrawsLoaded;
    }

    @Action({commit: 'setWithdraws', rawError: true})
    async fetchAll(data: {pagination?: PaginationRequestType; scroll?: boolean}): Promise<{ withdraws: IWithdraw[]; withdrawsLoaded: boolean; scroll: boolean }> {
        const formData = new FormData();
        let scroll = false;
        let withdrawsLoaded = false;
        if (data.pagination) {
            if (data.scroll) {
                scroll = data.scroll;
            }
            if (data.pagination.limit) {
                formData.append('limit', data.pagination.limit.toString());
            }
            else formData.delete('limit');
            if (data.pagination.skip) {
                formData.append('skip', data.pagination.skip.toString());
            }
            else formData.delete('skip');
        }
        const withdraws = await store.$repository.withdraw.fetchAll(formData);
        if (withdraws) {
            withdrawsLoaded = true;
        }
        return { withdraws, withdrawsLoaded, scroll }
    }

    @Action({rawError: true})
    async withdraw(data: WithDrawRequestType): Promise<boolean> {
        return await store.$repository.withdraw.withdraw(data);
    }
}

export const WithdrawsStore = getModule(WithdrawsModule);
