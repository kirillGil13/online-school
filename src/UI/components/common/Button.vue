<template>
    <button :disabled="!isPhoneValid" @click="submit()" class="form-button">Продолжить</button>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Button extends Vue{
    @Prop(Function) readonly submit: Function | undefined;
    @Prop(Boolean) readonly isPhoneValid: boolean | undefined;
}
</script>