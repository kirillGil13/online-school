<template>
<v-row>
  <v-col class="org">
    <v-col class="org__header pa-0">
      <v-row class="org-cover ma-0">
        <v-row class="social ma-0">
          <v-col class="social__item pa-0">
            <svg-icon name="Facebook"></svg-icon>
          </v-col>
          <v-col class="social__item pa-0">
            <svg-icon name="Twitter"></svg-icon>
          </v-col>
          <v-col class="social__item pa-0">
            <svg-icon name="Instagram"></svg-icon>
          </v-col>
        </v-row>
      </v-row>
      <v-col class="org-detail box-container">
        <div class="container">
          <v-col class="pa-0">
            <v-row class="ma-0">
              <v-col cols="2" class="pa-0">
                <v-avatar
                    color="white"
                    size="66"
                >VO</v-avatar>
              </v-col>
              <v-col class="org-info pa-0">
                <h1>Vexel Online</h1>
                <div class="desc">276 подписчиков</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="org-action pa-0">
            <Button>Подписаться</Button>
          </v-col>
        </div>
        <div class="org-menu mt-3">
          <v-tabs show-arrows color="#426DF6"  v-model="activeName" height="40px">
            <v-tabs-slider color="#426DF6"></v-tabs-slider>
            <router-link v-for="(item, index) in tabs" :key="index" :to="{name: item.component}">
              <v-tab>
                {{item.title}}
              </v-tab>
            </router-link>
          </v-tabs>
        </div>
      </v-col>
    </v-col>
    <v-col class="pa-0 mt-6">
      <v-tabs-items v-model="activeName">
        <v-tab-item v-for="(item, index) in tabs" :key="index">
            <router-view></router-view>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-col>
</v-row>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Button from '@/UI/components/common/Button.vue';
import {ITabs} from '@/entity/tabs/tabs.types';
import {TabsStore} from '@/store/modules/Tabs';
@Component({
  components: {Button}
})
export default class OrganizationDetail extends Vue {
  activeName = 0;
  get tabs(): ITabs[] {
    return TabsStore.organizationTabs;
  }
  @Watch('$route.name', {immediate: true})
  onChangeRoute(): void {
    this.activeName = this.tabs.findIndex(item => item.component === this.$route.name);
  }
}
</script>

<style lang="scss">
.org {
  width: 100%;
  padding-top: 2px !important;
  &__header {
    .org-cover {
      border-radius: 12px 12px 0 0;
      min-height: 198px;
      position: relative;
      background-size: auto;
      background: url("https://s3.amazonaws.com/thumbnails.venngage.com/template/3e74c6fd-b60d-41bb-b34f-bd0a9e2be0b7.png") no-repeat center;
      width: 100%;
      .social {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(4px);
        border-radius: 4px;
        padding: 5px 8px;
        &__item {
          cursor: pointer;
          margin-right: 11px;
          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }
    .org-detail {
      border-radius: 0 0 12px 12px !important;
      padding: 16px 16px 0 16px !important;
      .container {
        .v-avatar {
          border: 1px solid #F2F2F2 !important;
        }
        .org-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          h1 {
            font-size: 24px;
            color: #060516;
          }
          .desc {
            font-size: 12px;
            color: #828282;
          }
        }
        .org-action {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
    .org-menu {
      a {
        height: 100%;
        .v-tab {
          height: 100%;
          font-size: 14px !important;
          text-transform: none !important;
          letter-spacing: normal !important;
        }
      }
    }
  }
  button {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 12px;
    border-radius: 8px;
    margin-top: 0;
  }
  .courses {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
}
</style>