<template>
    <div class="login_page">
        <Form />
        <main-account-card :userInfo="fakeUserInfo" :menuData="testData" />
        <banner :bannerType="'inviteBanner'" />
    </div>
</template>
<script lang="ts">
import { IUserModule } from '@/store/modules/users/users.types';
import { Component, Model, Vue } from 'vue-property-decorator';
import Form from '../components/common/Form.vue';
import MainAccountCard from '../components/mainAccountCard/MainAccountCard.vue';
import { IFakeUserInfo } from '@/entity/environment';
import { IMainMenu } from '@/entity/menu/menu.types';
import Banner from '../components/common/Banner.vue';
//import user from '@/store/modules/users';

@Component({
    components: {
        Form,
        MainAccountCard,
        Banner
    }
})
export default class Login extends Vue {
    private testData: IMainMenu[] = [
        {
            title: 'Главная',
            iconName: 'Home',
            path: '/'
        },
        {
            title: 'Обучение',
            iconName: 'Education',
            path: '/'
        },
        {
            title: 'Материалы',
            iconName: 'Folder',
            path: '/'
        },
        {
            title: 'События',
            iconName: 'Calendar',
            path: '/'
        },
        {
            title: 'Чат',
            iconName: 'Chat',
            path: '/'
        },
        {
            title: 'Кандидаты',
            iconName: 'Add_User',
            path: '/'
        },
        {
            title: 'Партнеры',
            iconName: 'Users',
            path: '/'
        }
    ];
    private fakeUserInfo: IFakeUserInfo = {
        name: 'Денис',
        surname: 'Денисов',
        login: 'denis_loh',
        avatar:
            'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg'
    };
    get user(): IUserModule {
        return this.user as IUserModule;
    }
}
</script>
