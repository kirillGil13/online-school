
<template>
    <form class="form" @submit.prevent>
        <h1 class="mb-36">ONELINKS.COM</h1>
        <label for="phone">Номер телефона</label>
        <div class="text-container">
            <input
                v-model="form.props.phone"
                @blur="form.controls.phone.markAsDirty()"
                id="phone"
                name="phone"
                type="text"
            />
            <span class="input-value">{{ form.value.countryCode }}</span>
        </div>
        <div class="error-label" v-if="form.controls.phone.dirty">{{ form.controls.phone.errorMessage }}</div>
        <Button class="full-width" :disabled="!form.valid" v-on="$listeners">Продолжить</Button>
    </form>
</template>
<script lang="ts">
import { LoginForm } from '@/form/login/loginForm';
import { IFormGroup } from '@rxweb/reactive-forms';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '../common/Button.vue';

@Component({
    components: {
        Button,
    },
})
export default class LoginFormVue extends Vue {
    @Prop() readonly form!: IFormGroup<LoginForm>;
}
</script>
<style lang="scss">
.form {
    h1 {
        text-align: center;
    }
}
.full-width {
    width: 100%;
}
</style>
