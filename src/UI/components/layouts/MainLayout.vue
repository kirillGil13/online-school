<template>
    <v-app class="main-view">
            <v-main>
              <v-container fluid>
                <div class="aside-view">
                  <Sidebar :userInfo="user" />
                    <Banner/>
                </div>
                <router-view></router-view>
              </v-container>
            </v-main>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from '../common/Banner.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { BannerTypeEnum } from '@/entity/common/baner.types';
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

    get bannerTypes(): typeof BannerTypeEnum {
        return BannerTypeEnum;
    }
}
</script>
<style lang="scss">
.main-view {
}

.aside-view {
  min-width: 330px;
  padding-top: 15px !important;
  padding-left: 15px !important;
}
</style>
