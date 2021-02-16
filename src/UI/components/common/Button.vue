<template>
    <button :class="{'btn-full-width' : fullWidth}" :disabled="disabled" @click="$emit('submit')"><slot></slot></button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop({ default: false }) readonly disabled!: boolean;
    @Prop({type: Boolean, default: false}) readonly fullWidth!: boolean;
}
</script>
<style lang="scss">
.btn-full-width {
  width: 100% !important;
}
</style>