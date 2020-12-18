<template>
    <div>
        <slot name="title"></slot>
        <slot name="default"></slot>
        <div class="input__error-message">
            <slot name="error"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class InputWrapper extends Vue {}
</script>

<style lang="scss">
.input {
    &__error-message {
        color: $red;
    }
}
</style>
