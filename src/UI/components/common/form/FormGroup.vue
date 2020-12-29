<template>
    <div>
        <slot :attrs="{ errorMessages: allErrorsMessages, success: hasAnyErrors }" :hasErrors="hasErrors" />
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
