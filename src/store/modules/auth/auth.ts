import {Action, getModule, Module, VuexModule} from "vuex-module-decorators";
import Vue from 'vue';
import store from '@/Store';
import {ILoginForm} from "@/form/login/loginForm.types";
import { IUser } from '@/entity/user/user.types';
import User from '@/entity/user/user';

@Module({
    namespaced: true,
    name: 'auth',
    store,
    dynamic: true,
})
class AuthModule extends VuexModule {

    @Action
    async fetch() {
        await Vue.auth.fetch();
    }

    @Action
    async load() {
        await Vue.auth.load();
    }

    @Action
    async login(data: ILoginForm) {
        await Vue.auth.login({
            data: data,
            fetchUser: true,
            staySignedIn: true,
        });
    }

    @Action
    logout() {
        Vue.auth.logout({redirect: {name: 'Login'}});
    }
}

export const AuthStore = getModule(AuthModule);
