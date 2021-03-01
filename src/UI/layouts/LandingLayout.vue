<template>
  <v-app>
    <div class="content landing">
      <div class="landing__wrapper">
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {AdaptiveStore} from '../../store/modules/Adaptive';

@Component
export default class LandingLayout extends Vue {
  @Watch('$vuetify.breakpoint.name')
  onBreakpointChange(): void {
    AdaptiveStore.resolveAdaptive(this.$vuetify.breakpoint.name);
  }

  created(): void {
    AdaptiveStore.resolveAdaptive(this.$vuetify.breakpoint.name);
  }
}
</script>

<style lang="scss">
.landing {
  justify-content: center;
  align-items: center;
  background-color: transparent !important;

  &__wrapper {
    max-width: 1038px;
    width: 100%;
  }
}
</style>