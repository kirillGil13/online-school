<template>
  <v-dialog
      v-model="activatorChange"
      activator="activatorChange"
      :value="activator"
      content-class="modal-window"
      :max-width="videoModal ? 600 : 500"
  >
    <v-card class="modal-content">
      <slot name="content"/>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop({required: true}) readonly activator!: boolean;
  @Prop() readonly videoModal!: boolean;

  set activatorChange(activator: boolean) {
    this.$emit('activatorChange', activator);
  }

  get activatorChange(): boolean {
    return this.activator;
  }
}
</script>

<style lang="scss">
.modal-window {
  border-radius: 12px !important;
}
.modal-content {
  border-radius: 12px !important;
  max-height: 900px;
  overflow: scroll;
}
</style>
