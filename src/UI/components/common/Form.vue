<template>
  <form class="form">
    <h1>ONELINKS.com</h1>
    <label for="tel">{{loginForm.label}}</label>
    <input
      v-model="loginForm.props.phone"
      id="tel"
      name="tel"
      type="text"
      @blur="isInputTouched = true"
      :placeholder="loginForm.props.phone"
    />
    <!--<div v-if="loginForm.isPhoneError" class="error-label">{{loginForm.getErrorMessages('phone')[0]}}</div>-->
    <Button :isPhoneValid="loginForm.isPhoneValid" :submit="submit"/>
  </form>
</template>
<script lang="ts">
import { LoginForm } from "@/form/login/loginForm";
import { ILoginForm } from "@/form/login/loginForm.types";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-forms";
import { Component, Model, Vue, Watch } from "vue-property-decorator";
import Button from "./Button.vue";

@Component({
    components: {
        Button
    },
     
})
export default class Form extends Vue {
  isInputTouched = false;
  inputChanged!: string;
  loginForm!: IFormGroup<LoginForm>;
  formBuilder: RxFormBuilder = new RxFormBuilder();
  phone = '';
  
  constructor() {
      super();
      this.loginForm = this.formBuilder.formGroup(LoginForm) as IFormGroup<LoginForm>;
  }
 @Watch('loginForm.props.phone')
  onInputChange(val: string, oldVal: string) {
    if (val[0] != '+' || val[1] != '7') {
      this.loginForm.props.phone = '+7';
    }
  }
  submit() {
    
  }

}
</script>