<template>
  <div class="content center">
    <LoginFormVue v-if="!isSecondStep" :form="loginForm" @submit="sendPhone" />
    <CodeFormVue v-if="isSecondStep" :form="codeForm" @submit="sendCode" :phone="phone" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginFormVue from "../components/common/LoginForm.vue";
import CodeFormVue from "../components/common/CodeForm.vue";
import { LoginForm } from "@/form/login/loginForm";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-forms";
import { CodeForm } from "@/form/code/codeForm";
import { ICodeData, ILoginData } from "@/form/form";

@Component({
  components: {
    LoginFormVue,
    CodeFormVue,
  },
})
export default class Login extends Vue {
  loginForm!: IFormGroup<LoginForm>;
  codeForm!: IFormGroup<CodeForm>;
  formBuilder: RxFormBuilder = new RxFormBuilder();
  phone = "";
  code = "";
  isSecondStep = false;

  constructor() {
    super();
    this.loginForm = this.formBuilder.formGroup(
      LoginForm
    ) as IFormGroup<LoginForm>;
    this.codeForm = this.formBuilder.formGroup(
      CodeForm
    ) as IFormGroup<CodeForm>;
  }
  sendPhone(data: ILoginData) {
    this.phone = data.phone;
    this.isSecondStep = data.isSecondStep;
  }
  sendCode(data: ICodeData) {
    this.code = data.code;
  }
}
</script>

