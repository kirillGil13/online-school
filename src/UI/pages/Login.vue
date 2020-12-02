<template>
  <div class="content center">
    <LoginFormVue v-if="!isSecondStep" :form="loginForm" v-on="$listeners" @submit="sendPhone"/>
    <CodeFormVue v-if="isSecondStep" :form="codeForm" @click="sendCode" :phone="loginForm.modelInstance.fullPhone" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginFormVue from "../components/auth/LoginForm.vue";
import CodeFormVue from "../components/auth/CodeForm.vue";
import { LoginForm } from "@/form/login/loginForm";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-forms";
import { CodeForm } from "@/form/code/codeForm";

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
  async sendPhone(): Promise<void> {
      // todo send server
    console.log(this.loginForm.modelInstance)
    this.isSecondStep = true;
  }
  async sendCode(): Promise<void> {
    // todo send server
    this.$router.push({path: '/main'});
  }
}
</script>