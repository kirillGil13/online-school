<template>
  <form class="form">
    <h1 class="mb-36">ONELINKS.com</h1>
    <label for="phone">Номер телефона</label>
    <div class="text-container">
      <input
        v-model="form.props.phone"
        @blur="form.controls.phone.markAsDirty()"
        id="phone"
        name="phone"
        type="text"
      />
      <span class="input-value">{{form.value.countryCode}}</span>
    </div>
    <div class="error-label" v-if="form.controls.phone.dirty">{{form.controls.phone.errorMessage}}</div>
    <Button :disabled="!form.valid" :btnText="btnText" @submit="submit" />
  </form>
</template>
<script lang="ts">
import { LoginForm } from "@/form/login/loginForm";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-forms";
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";
import Button from "./Button.vue";

@Component({
  components: {
    Button,
  },
})
export default class LoginFormVue extends Vue {
    @Prop() readonly form!: IFormGroup<LoginForm>;
    btnText = 'Продолжить';
    submit() {
        this.form.props.isSecondStep = true;
        this.$emit('submit', {phone: this.form?.value.phone, isSecondStep: this.form.props.isSecondStep});
    }
}
</script>