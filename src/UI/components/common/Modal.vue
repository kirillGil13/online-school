<template>
  <v-dialog
      v-model="activatorChange"
      activator="activatorChange"
      :value="activator"
      :fullscreen="fullScreen"
      :hide-overlay="fullScreen"
      :content-class="!fullScreen ? 'modal-window' : ''"
      :max-width="!fullScreen ? modalMaxWidth : ''"
      :transition="fullScreen && 'dialog-bottom-transition'"
  >
    <v-card v-if="!fullScreen" class="modal-content" :color="color ? color : ''">
      <slot name="content"/>
    </v-card>
    <v-toolbar v-else
               dark
               color="primary"
    >
      <v-toolbar-title>Ответ пользователю</v-toolbar-title>
      <v-spacer></v-spacer>
      <div @click="activatorChange = false">
        <v-icon>mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-card>
      <slot name="full-screen-content"/>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop({required: true}) readonly activator!: boolean;
  @Prop({default: false, type: Boolean}) readonly fullScreen!: boolean;
  @Prop() readonly videoModal!: boolean;
  @Prop() readonly maxWidth!: number;
  @Prop() readonly color!: string;

  set activatorChange(activator: boolean) {
    this.$emit('activatorChange', activator);
  }

  get activatorChange(): boolean {
    return this.activator;
  }

  get modalMaxWidth(): number {
    if (this.maxWidth) {
      return this.maxWidth;
    } else if (this.videoModal) {
      return 600;
    } else return 600;
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
