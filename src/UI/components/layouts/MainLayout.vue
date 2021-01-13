<template>
    <v-app class="main-view">
        <v-main class="main-view__container">
            <v-container  fluid>
                <div class="aside-view">
                    <Sidebar :userInfo="user" />
                    <Banner />
                </div>
                <v-container class="ml-7">
                    <router-view></router-view>
                </v-container>
            </v-container>
        </v-main>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from '../common/Banner.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { AuthStore } from '@/store/modules/Auth';
import { IUser } from '@/entity/user';

@Component({
    components: {
        Sidebar,
        Banner,
    },
})
export default class MainLayout extends Vue {
    get user(): IUser {
        return AuthStore.user;
    }
}
</script>
<style lang="scss">
.main-view {
  font-family: 'Ubuntu' !important;
  &__container{
    background-color: #fbfcfe;
    padding: 15px 55px 0 15px !important;
  }
}

.aside-view {
    width: 290px;
}
.content {
    width: 100%;
    padding-top: 10px !important;
    margin-left: 36px;
}
</style>
