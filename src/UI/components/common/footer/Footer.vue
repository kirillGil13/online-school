<template>
  <v-footer
      color="transparent"
      padless
      app
      absolute
      class="mt-6"
  >
    <v-row
        justify="center"
        no-gutters
        :class="[contentClass]"
    >
      <v-col
          class="pa-4"
          cols="12"
      >
        <div class="org">@ 2020 — Onelinks.com</div>
        <v-divider class="mt-3"></v-divider>
        <v-row no-gutters>
          <router-link v-for="(item, index) in footerItems" :key="index" class="font-14 mt-3 mr-3 footer-menu"
                       :to="{name: item.route}">{{ item.title }}
          </router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IMainMenu} from '../../../../entity/menu';
import {MenuStore} from '../../../../store/modules/Menu';

@Component
export default class Footer extends Vue {
  @Prop() readonly contentClass!: string;

  get footerItems(): IMainMenu[] {
    return MenuStore.footerMenu;
  }
}
</script>

<style lang="scss">
.org {
  color: #5F739C;
}
.footer-menu {
  color: #5F739C !important;
}
</style>
