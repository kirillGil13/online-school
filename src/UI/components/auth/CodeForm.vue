<template>
    <form class="form code-form" @submit.prevent>
        <h1 class="mb-36">ONELINKS.COM</h1>
        <span>Подтвердите номер телефона {{ phone }} введите код из СМС</span>
        <label for="code">Код из СМС</label>
        <div class="text-container">
            <input
                v-model="form.props.code"
                @blur="form.controls.code.markAsDirty()"
                id="code"
                name="code"
                type="text"
            />
        </div>
        <div class="error-label" v-if="form.controls.code.dirty">{{ form.controls.code.errorMessage }}</div>
        <Button :disabled="!form.valid" class="full-width" v-on="$listeners">Подтвердить</Button>
    </form>
</template>
<script lang="ts">
import { CodeForm } from '@/form/code/codeForm';
import { IFormGroup } from '@rxweb/reactive-forms';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '../common/Button.vue';

@Component({
    components: {
        Button,
    },
})
export default class CodeFormVue extends Vue {
    @Prop() readonly form!: IFormGroup<CodeForm>;
    @Prop({ default: '' }) readonly phone: string | undefined;
}
</script>
<style lang="scss">
.code-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
        color: #5f739c;
        width: 60%;
        text-align: center;
        margin-bottom: 12px;
    }
}
</style>
