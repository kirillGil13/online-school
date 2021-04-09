<template>
    <button :class="[fullWidth ? 'btn-full-width' : '', small ? 'small' : '']" @dblclick.stop :disabled="disabled" @click="submit"><slot></slot></button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop({ default: false }) readonly disabled!: boolean;
    @Prop({type: Boolean, default: false}) readonly fullWidth!: boolean;
    @Prop({type: Boolean, default: false}) readonly small!: boolean;

    submit(): void {
      this.$emit('submit');
    }
}
</script>
<style lang="scss">
.btn-full-width {
  width: 100% !important;
}
</style>
