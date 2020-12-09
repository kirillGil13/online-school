<template>
  <!-- <div class="mainLayout">
      <CourseComponent/>
  </div> -->
  <el-container>
    <el-aside class="aside-view" width="330px"
      ><main-account-card :userInfo="fakeUserInfo" :menuData="testData"/>
      <banner
        :bannerType="bannerTypes.PRO_ACCOUNT_PROMO"
        :qrcode="'https://miro.medium.com/max/495/1*PNniLVIC_Hc7gNIxjvWPWg.png'"
    /></el-aside>
    <el-container>
      <el-main class="main-view"><router-view></router-view></el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CourseComponent from './course/CourseComponent.vue';
import Banner from './common/Banner.vue';
import MainAccountCard from './mainAccountCard/MainAccountCard.vue';
import { IFakeUserInfo } from '@/entity/environment';
import { IMainMenu } from '@/entity/menu/menu.types';
import { BannerTypeEnum } from '@/entity/common/baner.types';
@Component({
  components: {
    CourseComponent,
    MainAccountCard,
    Banner
  }
})
export default class MainLayout extends Vue {
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
    avatar: 'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg'
  };
  private get bannerTypes() {
    return BannerTypeEnum;
  }
}
</script>
<style lang="scss">
.main-view {
  padding: 15px !important;
}
.aside-view {
  padding-top: 15px !important;
  padding-left: 15px !important;
}
</style>
