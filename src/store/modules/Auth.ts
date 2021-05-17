/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';
import Vue from 'vue';
import store from '@/store';
import { User, IUser, UserResponseType } from '@/entity/user';
import { LoginRequestType } from '@/form/login';
import Api from '@/repository/api';
import {CodeRequestType} from '@/form/code/codeForm.types';
import {RegisterRequestType} from '@/form/register/RegisterForm.types';
import {PhoneRequestType} from '@/form/phone/phoneForm.types';
import {RouterNameEnum} from '@/router/router.types';

@Module({
    namespaced: true,
    name: 'auth',
    store,
    dynamic: true,
})
class AuthModule extends VuexModule {

    get user(): IUser | null {
        try {
            const user = new User(Vue.auth.user() as UserResponseType)
            return user;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    @Action
    async fetch(): Promise<any> {
        return await Vue.auth.fetch({});
    }

    @Action
    async load(): Promise<any> {
        return await Vue.auth.load();
    }

    @Action({ rawError: true })
    async login(data: LoginRequestType): Promise<any> {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);
        return await Vue.auth.login({
            data: formData,
            fetchUser: true,
            staySignedIn: true,
        });
    }

    @Action({ rawError: true })
    async sendCode(data: PhoneRequestType): Promise<any> {
        const response = await Api.post('/accounts/send_code', data);
        return response.data;
    }

    @Action({ rawError: true })
    async checkCode(data: CodeRequestType): Promise<any> {
        const response = await Api.post('/accounts/check_code', data);
        return response.data;
    }

    @Action({ rawError: true })
    async register(data: RegisterRequestType): Promise<any> {
        if (await Vue.auth.register({
            data: data,
            fetchUser: true,
            staySignedIn: true,
        })) {
            const formData = new FormData();
            formData.append('username', data.email);
            formData.append('password', data.password);
            localStorage.setItem('newUser', 'true');
            return await Vue.auth.login({
                data: formData,
                fetchUser: true,
                staySignedIn: true,
            })
        }
    }

    @Action
    async logout(): Promise<void> {
       await Vue.auth.logout({ redirect: { name: RouterNameEnum.AuthLogin } });
    }
}

export const AuthStore = getModule(AuthModule);
