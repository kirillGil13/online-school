<template>
  <form class="form">
    <h1 class="mb-36">ONELINKS.com</h1>
    <label for="phone">Номер телефона</label>
    <div class="text-container">
      <input
        v-model="loginForm.props.phone"
        @blur="loginForm.controls.phone.markAsDirty()"
        id="phone"
        name="phone"
        type="text"
      />
      <span class="input-value">{{loginForm.value.countryCode}}</span>
    </div>
    <div class="error-label" v-if="loginForm.controls.phone.dirty">{{loginForm.controls.phone.errorMessage}}</div>
    <Button :disabled="!loginForm.valid" :btnText="loginForm.value.btnText" @submit="submit" />
  </form>
</template>
<script lang="ts">
import { LoginForm } from "@/form/login/loginForm";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-forms";
import { Component, Model, Vue, Watch } from "vue-property-decorator";
import Button from "./Button.vue";

@Component({
  components: {
    Button,
  },
})
export default class Form extends Vue {
  loginForm!: IFormGroup<LoginForm>;
  formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.loginForm = this.formBuilder.formGroup(
      LoginForm
    ) as IFormGroup<LoginForm>;
  }
  submit() {
    alert(this.loginForm.value.countryCode);
  }
}
</script>