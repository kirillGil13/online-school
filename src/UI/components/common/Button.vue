<template>
    <button :class="[fullWidth ? 'btn-full-width' : '', small ? 'small' : '']" :disabled="disabled" @click="$emit('submit')"><slot></slot></button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop({ default: false }) readonly disabled!: boolean;
    @Prop({type: Boolean, default: false}) readonly fullWidth!: boolean;
    @Prop({type: Boolean, default: false}) readonly small!: boolean;
}
</script>
<style lang="scss">
.btn-full-width {
  width: 100% !important;
}
</style>