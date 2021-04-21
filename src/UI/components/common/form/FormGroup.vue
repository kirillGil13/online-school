<template>
    <FormInput v-slot="attrs" :messages="form.getMessages(field)" :server-errors="serverErrors" :validator="validator" :classes="classes">
      <label class="d-flex justify-start" v-if="label">{{label}}</label>
        <slot v-bind="attributes(attrs)" />
        <div v-if="showCustomError">
            <span v-for="(error, i) in attrs.errorMessages" :key="i" class="red--text ml-4"> {{ error }} </span>
        </div>
    </FormInput>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, Vue } from 'vue-property-decorator';
import FormInput from '@/UI/components/common/form/FormInput.vue';
import { Form } from '@/form/form';
import { Validation } from 'vuelidate';

@Component({
    components: { FormInput },
})
export default class FormGroup extends Vue {
    @Prop({ required: true }) readonly field!: string;
    @Prop({ required: true }) readonly form!: Form;
    @Prop({ type: Boolean, default: false }) readonly showCustomError!: boolean;
    @Prop() readonly label!: string;
    @Prop({default: ''}) classes!: string;
    @Prop({default: false}) readonly isPhone!: boolean;
    get validator(): Validation {
        return this.form.$v[this.field];
    }

    get serverErrors(): string[] {
        return this.form.getErrors(this.field);
    }

    attributes(attrs: any): any {
        attrs.label = this.field;
        attrs.name = this.field;
        attrs.outlined = true;
        attrs.autocomplete = 'off';
        attrs.change = (): void => {
            this.form.$v[this.field].$touch();
            this.form.clearErrors();
        };
        return attrs;
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
