<template>
  <div class="alert">
    <v-snackbar
        v-model="showAlert"
        :timeout="2500"
        outlined
        :color="resolveType()"
    >
      <v-row class="d-flex align-center" no-gutters>
        <svg-icon class="mr-3" :name="resolveType()"></svg-icon>
        {{text}}
      </v-row>
    </v-snackbar>
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {AlertTypeEnum} from '../../../entity/common/alert.types';

@Component
export default class Alert extends Vue {
  @Prop({required: true, default: ''}) readonly type!: string;
  @Prop({required: true}) readonly show!: boolean;
  @Prop({required: true}) readonly text!: string;

  set showAlert(show: boolean) {
    this.$emit('show', show);
  }

  get showAlert(): boolean {
    return this.show;
  }

  resolveType(): string {
    let type = '';
    switch (this.type) {
      case AlertTypeEnum.Info: type = AlertTypeEnum.Info; break;
      case AlertTypeEnum.Success: type = AlertTypeEnum.Success; break;
      case AlertTypeEnum.Error: type = AlertTypeEnum.Error; break;
    }
    return type;
  }
}
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  bottom: 0;
  right: 50%;
  .svg-icon {
    width: 24px !important;
    height: 24px !important;
  }
}
</style>
