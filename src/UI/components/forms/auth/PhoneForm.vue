<template>
  <v-form class="form" @submit.prevent>
    <div class="mt-9">
      <FormGroup v-slot="attrs" :form="form" field="resultPhone" :is-phone="true" show-custom-error label="Номер телефона">
        <vue-phone-number-input
            v-model="form.phone"
            v-bind="attrs"
            size="lg"
            :translations="translations"
            @update="changeCode"
            ref="phoneMaskInput"
            no-example
        />
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
import {translations} from '../../../../plugins';

@Component({
  components: {Button, FormGroup, PhoneMaskInput}
})
export default class PhoneFormVue extends Vue {
  @Prop() readonly form!: PhoneForm;

  translations = translations;

  changeCode(e: any): void {
    if (this.form.phone !== '') {
      this.form.$v['resultPhone'].$touch();
    }
    this.form.resultPhone = e.formattedNumber;
  }
}
</script>

<style lang="scss">
.captcha {
  color: #828282;
  font-size: 12px;
}
</style>
