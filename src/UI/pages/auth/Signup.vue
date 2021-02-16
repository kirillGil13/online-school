<template>
  <div>
    <h2 class="form-title">Регистрация</h2>
    <CodeFormVue v-if="!registerStep" :form="codeForm" @submitCode="submitCode" @submitPhone="submitPhone"
                 :code-step="codeStep"/>
    <RegisterFormVue v-else :form="registerForm" @submit="submitRegister"/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LoginFormVue from '../../components/auth/RegisterForm.vue';
import CodeFormVue from '../../components/auth/CodeForm.vue';
import Profile from '../profile/Profile.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import {AuthStore} from '@/store/modules/Auth';
import Logo from '@/UI/components/common/Logo.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import Button from '../../components/common/Button.vue';
import {CodeForm} from '../../../form/code/codeForm';
import RegisterFormVue from '../../components/auth/RegisterForm.vue';
import {RegisterForm} from '../../../form/register/RegisterForm';

@Component({
  components: {
    RegisterFormVue,
    Button,
    FormGroup,
    LoginFormVue,
    CodeFormVue,
    Profile,
    Logo,
    PhoneMaskInput,
  },
})
export default class Signup extends Vue {
  codeForm = new CodeForm();
  registerForm = new RegisterForm();
  codeStep = false;
  registerStep = false;

  changePhone(): void {
    if (this.codeForm.phoneMask) {
      this.codeForm.$v['phoneValid'].$touch();
    }
    //@ts-ignore
    this.form.phoneMask = this.$refs.phoneMaskInput.$refs.phoneMask.mask;
  }

  async submitPhone(): Promise<boolean> {
    const res = await this.codeForm.submit(AuthStore.checkPhone);
    if (res) {
      this.codeForm.clearErrors();
      this.codeStep = true;
      return true;
    } else {
      this.codeStep = false;
      return false;
    }
  }


  async submitCode(): Promise<boolean> {
    const res = await this.codeForm.submit(AuthStore.checkPhone);
    if (res) {
      this.registerForm.phone = this.codeForm.getFormData().phone;
      this.registerForm.code = this.codeForm.getFormData().code;
      this.registerStep = true;
      return true;
    } else return false;
  }

  submitRegister(): boolean {
    if (this.registerForm.submit(AuthStore.register)) {
      return true;
    } else return false;
  }
}
</script>
<style lang="scss">
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

.form-title {
  font-size: 24px;
  text-align: center;
}
</style>
