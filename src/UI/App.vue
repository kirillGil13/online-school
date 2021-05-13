<template>
  <v-app class="main-view">
    <v-main class="main-view__container pb-0">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {AuthStore} from '@/store/modules/Auth';
import {RouterNameEnum} from '@/router/router.types';

@Component
export default class App extends Vue {

  @Watch('$vuetify.breakpoint.name')
  onBreakpointChange(): void {
    this.$adaptive.isMobile = this.resolveAdaptiveMobile();
  }

  async created(): Promise<void> {
    this.$adaptive.isMobile = this.resolveAdaptiveMobile();
    await AuthStore.load();
  }

  resolveAdaptiveMobile(): boolean {
    let isMobile = false;
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        isMobile = true;
        break;
      case 'sm':
        isMobile = true;
        break;
      case 'md':
        isMobile = false;
        break;
    }
    return isMobile;
  }

}
</script>
<style lang="scss"></style>
