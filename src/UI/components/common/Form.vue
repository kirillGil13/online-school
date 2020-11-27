<template>
  <form class="form">
    <h1>ONELINKS.com</h1>
    <label for="tel">{{loginForm.label}}</label>
    <input
      v-model="loginForm.phone"
      @blur="loginForm.isPhoneTouched = true;"
      :id="loginForm.name"
      :name="loginForm.name"
      type="text"
      :placeholder="loginForm.phone"
    />
    <div v-if="loginForm.isPhoneError" class="error-label">{{loginForm.getErrorMessages('phone')[0]}}</div>
    <button :disabled="!loginForm.isPhoneValid" @click="submit()" class="form-button">Продолжить</button>
  </form>
</template>
<script lang="ts">
import { LoginForm } from "@/form/login/loginForm";
import { Component, Model, Vue, Watch } from "vue-property-decorator";

@Component
export default class Form extends Vue {
  isInputTouched = false;
  inputChanged!: string;
  loginForm = new LoginForm();
  @Watch('loginForm.phone', { immediate: true })
  onInputChange(val: string, oldVal: string) {
    if (val[0] != '+' || val[1] != '7') {
      this.loginForm.phone = '+7';
    }
  }
  submit() {
    console.log(this.loginForm.phone);
  }
}
</script>