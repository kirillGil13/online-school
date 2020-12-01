import {VuexModule, Module, getModule, Action, MutationAction} from "vuex-module-decorators";
import store from "@/store";
import { ILoginForm } from '@/form/login/loginForm.types';
import { IUser } from '@/entity/user/user.types';
import Vue from 'vue/types/umd';
import User from '@/entity/user/user';

@Module({
    namespaced: true,
    name: 'users',
    store
})
class UsersModule extends VuexModule// implements IUser
{
    user: IUser | null = null;

    /*@MutationAction
    async auth(data: ILoginForm) {
        let userResponse =  await Vue.auth.login(data);
        return {user: new User(userResponse)};
    }

    /*@Action
    auth(data: ILoginForm): IUser {
        return this.user.auth(data);
    }
    auth(data: UserResponseType): IUser {
        new User(data);
    }*/
}
export default getModule(UsersModule);
