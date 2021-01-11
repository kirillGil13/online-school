<template>
    <v-app class="main-view">
        <v-main class="main-view__container">
            <v-container  fluid>
                <div class="aside-view">
                    <Sidebar :userInfo="user" />
                    <Banner />
                </div>
                <div class="content">
                    <router-view></router-view>
                </div>
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
  &__container{
    background-color: #fbfcfe;
  }
}

.aside-view {
    width: 290px;
    padding-top: 16px !important;
    padding-left: 16px !important;
}
.content {
    min-width: 1070px;
    padding-top: 20px !important;
    margin-left: 36px;
}
</style>
