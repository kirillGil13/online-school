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
  padding: 12px 16px 12px 16px;
  border-style: solid;
  border-radius: 5px 0 0 5px;

  &__normal {
    border-radius: 5px;
  }
}
</style>
