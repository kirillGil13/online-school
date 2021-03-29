<template>
  <v-form class="form" @submit.prevent="submit">
    <div class="mt-9 mb-3">
      <FormGroup v-slot="attrs" :form="form" field="username" show-custom-error label="Email">
        <input
            class="input input__normal"
            type="email" name="username"
            id="username"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
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
      <Button small full-width :disabled="form.disabled" type="submit" @submit="submit" @keydown.enter="submit">Войти</Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
    </div>
    <div class="d-flex justify-center">
      <router-link class="form-second-action mt-6" :to="{ name: $routeRules.AuthSignup }">Зарегистрироваться
      </router-link>
    </div>
    <div class="d-flex justify-center">
      <router-link class="form-third-action mt-3" :to="{ name: $routeRules.AuthRecover }">Забыли пароль?</router-link>
    </div>
  </v-form>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LoginFormVue from '../../components/forms/auth/RegisterForm.vue';
import CodeFormVue from '../../components/forms/auth/CodeForm.vue';
import {LoginForm} from '@/form/login/LoginForm';
import Profile from '../profile/Profile.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import {AuthStore} from '@/store/modules/Auth';
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
</style>
