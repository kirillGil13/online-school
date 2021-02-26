<template>
  <div>
    <h2 class="form-title">Регистрация</h2>
    <template v-if="!registerStep" >
      <PhoneFormVue v-if="!codeStep" :form="phoneForm" @submitPhone="submitPhone"/>
      <CodeFormVue v-else :form="codeForm" @submitCode="submitCode"/>
    </template>
    <RegisterFormVue v-else :form="registerForm" @submit="submitRegister"/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LoginFormVue from '../../components/forms/auth/RegisterForm.vue';
import CodeFormVue from '../../components/forms/auth/CodeForm.vue';
import Profile from '../profile/Profile.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import {AuthStore} from '@/store/modules/Auth';
import Logo from '@/UI/components/common/Logo.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import Button from '../../components/common/Button.vue';
import {CodeForm} from '../../../form/code/codeForm';
import RegisterFormVue from '../../components/forms/auth/RegisterForm.vue';
import {RegisterForm} from '../../../form/register/RegisterForm';
import PhoneFormVue from '../../components/forms/auth/PhoneForm.vue';
import {PhoneForm} from '../../../form/phone/phoneForm';

@Component({
  components: {
    PhoneFormVue,
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
  phoneForm = new PhoneForm();
  registerForm = new RegisterForm();
  codeStep = false;
  registerStep = false;

  async submitPhone(): Promise<boolean> {
    const res = await this.phoneForm.submit(AuthStore.sendCode);
    if (res) {
      this.phoneForm.clearErrors();
      this.codeStep = true;
      this.codeForm.phone = this.phoneForm.phone;
      return true;
    } else {
      this.codeStep = false;
      return false;
    }
  }


  async submitCode(): Promise<boolean> {
    const res = await this.codeForm.submit(AuthStore.checkCode);
    if (res) {
      this.registerForm.phoneNumber = this.codeForm.getFormData().phone_number;
      this.registerStep = true;
      return true;
    } else return false;
  }

 async submitRegister(): Promise<boolean> {
    if (await this.registerForm.submit(AuthStore.register)) {
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

.form-title {
  font-size: 24px;
  text-align: center;
}
</style>
