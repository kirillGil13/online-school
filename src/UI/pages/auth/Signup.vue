<template>
    <v-form class="form" @submit.prevent="submit">
        <div class="my-9">
            <FormGroup v-slot="attrs" :form="form" field="phoneValid" show-custom-error>
                <PhoneMaskInput
                    v-model="form.phone"
                    v-bind="attrs"
                    autoDetectCountryв
                    flagSize="normal"
                    inputClass="input"
                    placeholder="Введите номер телефона"
                    showFlag
                    wrapperClass="wrapper"
                    ref="phoneMaskInput"
                    @onValidate="(e) => (form.phoneValid = e.isValidByLibPhoneNumberJs)"
                    @input="changePhone"
                />
            </FormGroup>
        </div>
        <div class="my-9">
            <FormGroup v-slot="attrs" :form="form" field="password">
                <v-text-field
                    v-model="form[attrs.name]"
                    v-bind="attrs"
                    label="Пароль"
                    placeholder="Введите пароль"
                    type="password"
                    @input="attrs.change"
                />
            </FormGroup>
        </div>
        <div>
            <v-btn :disabled="form.disabled" type="submit">Продолжить</v-btn>
        </div>
        <div>
            <router-link :to="{ name: $routeRules.AuthSignup }">Зарегистрироваться</router-link>
        </div>
    </v-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginFormVue from '../../components/auth/LoginForm.vue';
import CodeFormVue from '../../components/auth/CodeForm.vue';
import { LoginForm } from '@/form/login/LoginForm';
import Profile from '../profile/Profile.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import { AuthStore } from '@/store/modules/Auth';
import Logo from '@/UI/components/common/Logo.vue';
import PhoneMaskInput from 'vue-phone-mask-input';

@Component({
    components: {
        FormGroup,
        LoginFormVue,
        CodeFormVue,
        Profile,
        Logo,
        PhoneMaskInput,
    },
})
export default class Signup extends Vue {
    form = new LoginForm();

    changePhone(): void {
        if (this.form.phoneMask) {
            this.form.$v['phoneValid'].$touch();
        }
        //@ts-ignore
        this.form.phoneMask = this.$refs.phoneMaskInput.$refs.phoneMask.mask;
    }

    submit(): boolean {
        this.form.submit(AuthStore.login);
        // if (this.form.codeStep) {
        //     AuthStore.login(this.form.getFormData());
        // } else {
        //     // AuthStore.getTwofaCode(this.form.phone);
        //     this.form.codeStep = true;
        // }

        return false;
    }
}
</script>
<style lang="scss" scoped>
.v-input:not(.v-input--is-focused) {
    fieldset {
        border-color: #f2f2f2 !important;
    }
}

.success--text {
    fieldset {
        border-color: #f2f2f2 !important;
    }
}

.error--text {
    color: rgba(255, 0, 0, 0.7) !important;
}

.input {
    padding: 12px 16px 12px 16px;
    border-style: solid;
    border-radius: 5px 0 0 5px;

    &__normal {
        border-radius: 5px;
    }
}

.flag-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f2f2f2;
    width: 12%;
    background-color: #ecebeb;
    border-radius: 0 5px 5px 0;
}

.wrapper {
    display: flex;
    flex-direction: row;
}

button {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 12px;
}
</style>
