<template>
    <button :disabled="disabled" @click="$emit('submit')"><slot></slot></button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop({ default: false }) readonly disabled!: boolean;
}
</script>
