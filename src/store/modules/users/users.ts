import {VuexModule, Module, getModule, Action} from "vuex-module-decorators";
import store from "@/store";
import { ILoginForm } from '@/form/login/loginForm.types';
import { IUserModule } from './users.types';

@Module({
    namespaced: true,
    name: 'users',
    store
})
class UsersModule extends VuexModule //implements IUserModule
{
    user: IUserModule | null = null;
    /*@Action
    auth(data: ILoginForm): IUser {
        return this.user.auth(data);
    }
    auth(data: UserResponseType): IUser {
        new User(data);
    }*/
}
export default getModule(UsersModule);
