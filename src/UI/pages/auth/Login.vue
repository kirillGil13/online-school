<template>
    <v-form class="form" @submit.prevent="submit">
        <div class="mt-9 mb-3">
            <FormGroup v-slot="attrs" :form="form" field="phoneValid" show-custom-error label="Номер телефона">
                <PhoneMaskInput
                    v-model="form.phone"
                    v-bind="attrs"
                    autoDetectCountry
                    flagSize="normal"
                    inputClass="input"
                    showFlag
                    wrapperClass="wrapper"
                    ref="phoneMaskInput"
                    @onValidate="(e) => (form.phoneValid = e.isValidByLibPhoneNumberJs)"
                    @input="changePhone"
                />
            </FormGroup>
        </div>
        <div>
            <FormGroup v-slot="attrs" :form="form" field="password" label="Пароль">
              <input
                  class="input input__normal"
                  type="password" name="password"
                  id="password"
                  v-model="form[attrs.name]"
                  v-bind="attrs"
                  @input="attrs.change"
              >
            </FormGroup>
        </div>
        <div>
            <Button class="form-button" full-width :disabled="form.disabled" type="submit" @submit="submit">Войти</Button>
            <div class="red--text mt-1 ml-4" v-if="form.getErrors('400')[0]">{{form.getErrors('400')[0]}}</div>
        </div>
        <div class="d-flex justify-center">
            <router-link class="form-second-action mt-6" :to="{ name: $routeRules.AuthSignup }">Зарегистрироваться</router-link>
        </div>
    </v-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginFormVue from '../../components/auth/RegisterForm.vue';
import CodeFormVue from '../../components/auth/CodeForm.vue';
import { LoginForm } from '@/form/login/LoginForm';
import Profile from '../profile/Profile.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import { AuthStore } from '@/store/modules/Auth';
import Logo from '@/UI/components/common/Logo.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import Button from '../../components/common/Button.vue';

@Component({
    components: {
      Button,
        FormGroup,
        LoginFormVue,
        CodeFormVue,
        Profile,
        Logo,
        PhoneMaskInput,
    },
})
export default class Login extends Vue {
    form = new LoginForm();

    changePhone(): void {
        if (this.form.phoneMask) {
            this.form.$v['phoneValid'].$touch();
        }
        //@ts-ignore
        this.form.phoneMask = this.$refs.phoneMaskInput.$refs.phoneMask.mask;
    }

    submit(): boolean {
      if (this.form.submit(AuthStore.login)) {
        return true;
      } else return false;
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
</style>
