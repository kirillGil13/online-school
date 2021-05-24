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
          class="px-4 pb-4" :class="$adaptive.isMobile && 'pt-10'"
          cols="12"
      >
        <div class="org">© Onelinks, 2021 г. Все права защищены.</div>
        <v-divider class="mt-3"></v-divider>
        <div class="d-flex flex-row flex-wrap mb-3">
          <div v-for="(item, index) in footerItems" :key="index" class="d-flex flex-row mt-3">
            <router-link class="font-14 footer-menu" :style="{whiteSpace: $adaptive.isMobile ? 'normal' : 'nowrap'}"
                         :to="{name: item.route}">{{ item.title }}
            </router-link>
            <v-divider v-if="index !== footerItems.length - 1" class="mx-3" vertical></v-divider>
          </div>
        </div>
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
  font-size: 11px;
}
.footer-menu {
  color: #5F739C !important;
  word-break: normal;
  font-size: 12px;
}
</style>
