<template>
    <div class="content center">
        <LoginFormVue
            v-if="!isSecondStep"
            :form="loginForm"
            v-on="$listeners"
            @submit="sendPhone"
        />
        <CodeFormVue
            v-if="isSecondStep"
            :form="codeForm"
            @submit="sendCode"
            :phone="loginForm.modelInstance.fullPhone"
        />

        <main-account-card :userInfo="fakeUserInfo" :menuData="testData" />
        <banner
            :bannerType="bannerTypes.PRO_ACCOUNT_PROMO"
            :qrcode="
                'https://miro.medium.com/max/495/1*PNniLVIC_Hc7gNIxjvWPWg.png'
            "
        />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginFormVue from '../components/auth/LoginForm.vue';
import CodeFormVue from '../components/auth/CodeForm.vue';
import { LoginForm } from '@/form/login/loginForm';
import { IFormGroup, RxFormBuilder } from '@rxweb/reactive-forms';
import { CodeForm } from '@/form/code/codeForm';
import MainAccountCard from '../components/mainAccountCard/MainAccountCard.vue';
import { IFakeUserInfo } from '@/entity/environment';
import { IMainMenu } from '@/entity/menu/menu.types';
import Banner from '../components/common/Banner.vue';
//import user from '@/store/modules/users';
import { BannerTypeEnum } from '@/entity/common/baner.types';

@Component({
    components: {
        LoginFormVue,
        CodeFormVue,
        MainAccountCard,
        Banner,
    },
})
export default class Login extends Vue {
    loginForm!: IFormGroup<LoginForm>;
    codeForm!: IFormGroup<CodeForm>;
    formBuilder: RxFormBuilder = new RxFormBuilder();
    isSecondStep = false;

    constructor() {
        super();
        this.loginForm = this.formBuilder.formGroup(LoginForm) as IFormGroup<
            LoginForm
        >;
        this.codeForm = this.formBuilder.formGroup(CodeForm) as IFormGroup<
            CodeForm
        >;
    }
    async sendPhone(): Promise<void> {
        // todo send server
        console.log(this.loginForm.modelInstance);
        this.isSecondStep = true;
    }
    async sendCode(): Promise<void> {
        // todo send server
        this.$router.push({ path: '/main' });
    }

    private testData: IMainMenu[] = [
        {
            title: 'Главная',
            iconName: 'Home',
            path: '/',
        },
        {
            title: 'Обучение',
            iconName: 'Education',
            path: '/',
        },
        {
            title: 'Материалы',
            iconName: 'Folder',
            path: '/',
        },
        {
            title: 'События',
            iconName: 'Calendar',
            path: '/',
        },
        {
            title: 'Чат',
            iconName: 'Chat',
            path: '/',
        },
        {
            title: 'Кандидаты',
            iconName: 'Add_User',
            path: '/',
        },
        {
            title: 'Партнеры',
            iconName: 'Users',
            path: '/',
        },
    ];
    private fakeUserInfo: IFakeUserInfo = {
        name: 'Денис',
        surname: 'Денисов',
        login: 'denis_loh',
        avatar:
            'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg',
    };
    private get bannerTypes() {
        return BannerTypeEnum;
    }
}
</script>

