<template>
    <div>
        <slot name="label"></slot>
        <slot name="input" :attrs="{ errorMessages: allErrorsMessages, success: hasAnyErrors }" :hasErrors="hasAnyErrors"></slot>
    </div>
</template>
<script lang="ts">
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    extends: singleErrorExtractorMixin,
})
export default class extends Vue {
    @Prop({
        type: Array,
        default: () => [],
    })
    serverErrors!: string[];

    get allErrorsMessages(): string[] {
        return this.serverErrors.concat(this.activeErrorMessages);
    }

    get hasAnyErrors(): boolean {
        return this.isValid && !this.serverErrors.length;
    }
}
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
