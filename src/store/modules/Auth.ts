/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';
import Vue from 'vue';
import store from '@/store';
import { User, IUser, UserResponseType } from '@/entity/user';
import { LoginRequestType } from '@/form/login';
import Api from '@/services/api';

@Module({
    namespaced: true,
    name: 'auth',
    store,
    dynamic: true,
})
class AuthModule extends VuexModule {
    get user(): IUser {
        return new User(Vue.auth.user() as UserResponseType);
    }

    @Action
    async load(): Promise<any> {
        return await Vue.auth.load();
    }

    @Action({ rawError: true })
    async login(data: LoginRequestType): Promise<any> {
        return await Vue.auth.login({
            data: data,
            fetchUser: true,
            staySignedIn: true,
        });
    }

    @Action({ rawError: true })
    async getTwofaCode(phone: string): Promise<any> {
        const response = await Api.post('users/auth', {phone});
        return response.data.phone;
    }

    //
    // @Action({ rawError: true })
    // async twofaRegistration(data: LoginRequestType) {
    //     const response = await Api.post('users/2fa/registration', data);
    //     return response.data;
    // }
    //
    // @Action({ rawError: true })
    // async twofaLogin(data: LoginRequestType) {
    //     const response = await Api.post('users/2fa/login', data);
    //     return response.data.phone;
    // }
    //
    // @Action({ rawError: true })
    // async signup(data: SignupRequestType) {
    //     return await Vue.auth.register({ data });
    // }

    @Action
    logout(): void {
        Vue.auth.logout({ redirect: { name: 'Login' } });
    }
}

export const AuthStore = getModule(AuthModule);
