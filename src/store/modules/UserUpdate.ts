import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IUser, UserRequestType} from '@/entity/user';

@Module({
    namespaced: true,
    name: 'userUpdate',
    store,
    dynamic: true,
})
class UserUpdateModule extends VuexModule {

    @Action({ rawError: true })
    async updateUser(userToUpdate: UserRequestType): Promise<IUser> {
        const user = await store.$repository.userUpdate.updateUser(userToUpdate);
        return user;
    }
}

export const UserUpdateStore = getModule(UserUpdateModule);
