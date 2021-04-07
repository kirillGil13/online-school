<template>
  <v-form class="form" @submit.prevent>
    <div class="mt-9">
      <FormGroup v-slot="attrs" :form="form" field="phone" :is-phone="true" show-custom-error label="Номер телефона">
        <div id="phoneMask" class="d-flex flex-row">
          <vue-country-code
              @onSelect="changeCode" enabledCountryCode>
          </vue-country-code>
          <input
              class="input input__normal input-phone"
              v-model="form[attrs.name]"
              v-bind="attrs"
              @input="attrs.change"
          >
        </div>
      </FormGroup>
    </div>
    <v-divider class="mt-3"></v-divider>
    <div class="captcha mt-2 text-left">This site is protected by
      <a href="https://developers.google.com/recaptcha/docs/v3" target="_blank">reCAPTCHA</a> and the
      <a href="https://about.google/intl/ru/" target="_blank">Google</a></div>
    <div>
      <Button small full-width type="submit" :disabled="form.disabled" @submit="$emit('submitPhone')"
              @keydown.enter="$emit('submitPhone')">Продолжить
      </Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
    </div>
    <div class="d-flex justify-center">
      <router-link class="form-second-action mt-6" :to="{ name: $routeRules.AuthLogin }">Вернуться к входу</router-link>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {PhoneForm} from '../../../../form/phone/phoneForm';
import FormGroup from '../../common/form/FormGroup.vue';
import Button from '../../common/Button.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import {ISelectRegion} from '../../../../entity/common/selectRegion.types';

@Component({
  components: {Button, FormGroup, PhoneMaskInput}
})
export default class PhoneFormVue extends Vue {
  @Prop() readonly form!: PhoneForm;

  changeCode(data: ISelectRegion): void {
    this.form.region = '+' + data.dialCode;
  }
}
</script>

<style lang="scss">
.captcha {
  color: #828282;
  font-size: 12px;
}
.region {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  border: 1px solid #F2F2F2;
  background-color: #F2F2F2;
  border-radius: 5px 0 0 5px;
}
</style>
