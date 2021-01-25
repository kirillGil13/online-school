<template>
  <div class="alert">
      <v-alert
          text
          outlined
          transition="scale-transition"
          :type="success ? 'success' : 'error'"
          :value="show"
      >
        Данные <strong>{{!success ? 'не ' : ''}}сохранены</strong>
      </v-alert>
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Alert extends Vue {
  @Prop({required: true}) readonly success!: boolean;
  @Prop({required: true}) readonly show!: boolean;
}
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  bottom: 0;
  right: 0;
  .v-alert {
    background-color: transparent !important;
    border-radius: 12px !important;
  }
}
</style>
