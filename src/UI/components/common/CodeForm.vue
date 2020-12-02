<template>
  <form class="form">
    <h1 class="mb-36">ONELINKS.com</h1>
    <span>Подтвердите номер телефона {{phone}} введите код из СМС</span>
    <label for="code">Код из СМС</label>
    <div class="text-container">
      <input
        v-model="form.props.code"
        @blur="form.controls.code.markAsDirty()"
        id="code"
        name="code"
        type="text"
      />
    </div>
    <div class="error-label" v-if="form.controls.code.dirty">{{form.controls.code.errorMessage}}</div>
    <Button :disabled="!form.valid" :btnText="btnText" @submit="submit" />
  </form>
</template>
<script lang="ts">
import { CodeForm } from "@/form/code/codeForm";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-forms";
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";
import Button from "./Button.vue";

@Component({
  components: {
    Button,
  },
})
export default class CodeFormVue extends Vue {
    @Prop() readonly form: IFormGroup<CodeForm> | undefined;
    @Prop({default: ''}) readonly phone: string | undefined;
    btnText = 'Подтвердить';
    submit() {
        this.$emit('submit', {code: this.form?.value.code});
    }
}
</script>