<template>
  <div class="alert">
    <v-snackbar
        v-model="showAlert"
        :timeout="2500"
        :color="resolveType().color"
    >
      <v-row class="d-flex align-center" no-gutters>
        <v-icon class="mr-3">{{resolveType().type}}</v-icon>
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

  resolveType(): {color: string; type: string} {
    let type = '';
    let color = '';
    switch (this.type) {
      case AlertTypeEnum.Info: type = 'mdi-information-outline'; color = 'primary'; break;
      case AlertTypeEnum.Success: type = 'mdi-checkbox-marked-circle-outline'; color = 'success'; break;
      case AlertTypeEnum.Error: type = 'mdi-close-circle-outline'; color = 'error'; break;
    }
    return {color, type};
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
    fill: #FFFFFF !important;
    path {
      fill: #FFFFFF !important;
    }
  }
}
</style>
