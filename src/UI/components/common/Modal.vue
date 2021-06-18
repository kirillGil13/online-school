<template>
  <v-dialog
      v-model="activatorChange"
      activator="activatorChange"
      v-click-outside="closeM"
      :origin="origin"
      :persistent="false"
      :fullscreen="fullScreen"
      :hide-overlay="fullScreen"
      :width="width"
      :content-class="!fullScreen ? `modal-window ${modalClass}` : ''"
      :max-width="!fullScreen ? modalMaxWidth : ''"
      :transition="(fullScreen || fromBottom) && 'dialog-bottom-transition'"
  >
    <v-card v-if="!fullScreen && withoutToolBar" class="modal-content" :color="color ? color : ''">
      <slot name="content"/>
    </v-card>
    <v-card v-else-if="fullScreen && withoutToolBar" :style="{overflow: 'scroll'}" :color="color ? color : ''">
      <slot name="content"/>
    </v-card>
    <template v-else>
      <v-toolbar
                 dark
                 color="primary"
      >
        <v-toolbar-title>{{toolBarTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="!customIcon" @click.stop="activatorChange = false; $emit('close')" style="cursor: pointer">
          <v-icon>mdi-close</v-icon>
        </div>
          <div v-else @click.stop="!disabled ? $emit('close') : ''" style="cursor: pointer;">
              <v-icon size="32" :color="disabled ? 'rgba(255,255,255,0.45)' : '#ffffff'">{{customIcon}}</v-icon>
          </div>
      </v-toolbar>
      <v-card>
        <slot name="full-screen-content"/>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop({required: true}) readonly activator!: boolean;
  @Prop({default: false, type: Boolean}) readonly fullScreen!: boolean;
  @Prop({default: false, type: Boolean}) readonly fromBottom!: boolean;
  @Prop({default: true, type: Boolean}) readonly withoutToolBar!: boolean;
  @Prop({default: 'Ответ пользователю'}) readonly toolBarTitle!: string;
  @Prop({default: ''}) readonly customIcon!: string;
  @Prop({default: false}) readonly disabled!: boolean;
  @Prop() readonly modalClass!: string;
  @Prop() readonly videoModal!: boolean;
  @Prop() readonly origin!: string;
  @Prop() readonly maxWidth!: number;
  @Prop() readonly width!: string;
  @Prop() readonly color!: string;
  @Prop() readonly minWidth?: string;

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

  closeM(e: any): void {
    if (e.target.classList[0] === 'v-overlay__scrim') {
      this.activatorChange = false;
    }
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
