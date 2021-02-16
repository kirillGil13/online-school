<template>
  <v-form class="form code-form" @submit.prevent>
    <div class="d-flex justify-center code-desc mt-9" v-if="codeStep">
      <div>
        Подтвердите номер телефона <br>
        {{ form.phone }} введите код из СМС
      </div>
    </div>
    <div class="mt-9" v-if="!codeStep">
      <FormGroup v-slot="attrs" :form="form" field="phoneValid" show-custom-error label="Номер телефона">
        <PhoneMaskInput
            v-model="form.phone"
            v-bind="attrs"
            autoDetectCountry
            flagSize="normal"
            inputClass="input"
            placeholder="Введите номер телефона"
            showFlag
            wrapperClass="wrapper"
            ref="phoneMaskInput"
            @onValidate="(e) => (form.phoneValid = e.isValidByLibPhoneNumberJs)"
            @input="changePhone"
        />
      </FormGroup>
    </div>
    <div v-else>
      <FormGroup v-slot="attrs" :form="form" field="code" show-custom-error label="Код">
        <input
            class="input input__normal"
            type="code" name="code"
            id="code"
            v-model="form[attrs.name]"
            v-bind="attrs"
            placeholder="Введите код"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div>
      <Button class="form-button" v-if="!codeStep" full-width type="submit" :disabled="!form.phoneValid" @submit="$emit('submitPhone')">Продолжить
      </Button>
      <Button class="form-button" v-else full-width :disabled="form.disabled" type="submit" @submit="$emit('submitCode')">Подтвердить
      </Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('400')[0]">{{form.getErrors('400')[0]}}</div>
    </div>
    <div class="d-flex justify-center" v-if="!codeStep">
      <router-link class="form-second-action mt-6" :to="{ name: $routeRules.AuthLogin }">Вернуться к входу</router-link>
    </div>
  </v-form>
</template>
<script lang="ts">
import {CodeForm} from '../../../form/code/codeForm';
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '../common/Button.vue';
import FormGroup from '../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';

@Component({
  components: {
    FormGroup,
    Button,
    PhoneMaskInput
  },
})
export default class CodeFormVue extends Vue {
  @Prop() readonly form!: CodeForm;
  @Prop() readonly codeStep!: boolean;

  changePhone(): void {
    if (this.form.phoneMask) {
      this.form.$v['phoneValid'].$touch();
    }
    //@ts-ignore
    this.form.phoneMask = this.$refs.phoneMaskInput.$refs.phoneMask.mask;
  }
}
</script>
<style lang="scss">
.code-form {
  .code-desc {
    color: #5f739c;
    width: 100%;
    text-align: center;
    margin-bottom: 12px;
  }
}
</style>
