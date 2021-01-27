<template>
    <v-app class="main-view">
        <v-main class="main-view__container">
            <v-container class="fluid-container" fluid>
                <div class="aside-view">
                    <Sidebar :userInfo="user" />
                    <Banner />
                </div>
                <div class="ml-7 content">
                  <v-main>
                    <router-view></router-view>
                  </v-main>
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
  font-family: 'Ubuntu' !important;
  width: 100%;
  &__container{
    max-width: 1440px;
    background-color: #fbfcfe;
    padding: 15px 0 0 0 !important;
  }
}

.aside-view {
    width: 290px;
}
.content {
    width: 1440px - 290px - 36px;
    padding-top: 10px !important;
    margin-left: 36px;
}
.fluid-container{
  max-width: 1440px !important;
}
</style>
