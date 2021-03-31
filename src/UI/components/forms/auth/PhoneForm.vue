<template>
  <v-form class="form" @submit.prevent>
    <div class="mt-9">
      <FormGroup v-slot="attrs" :form="form" field="phoneValid" show-custom-error label="Номер телефона">
        <div id="phoneMask">
          <PhoneMaskInput
              v-model="form.phone"
              v-bind="attrs"
              autoDetectCountry
              flagSize="normal"
              inputClass="input"
              showFlag
              wrapperClass="wrapper"
              ref="phoneMaskInput"
              @onValidate="(e) => (form.phoneValid = e.isValidByLibPhoneNumberJs)"
              @input="changePhone"
          />
        </div>
      </FormGroup>
    </div>
    <div>
      <Button small full-width type="submit" :disabled="form.disabled" @submit="$emit('submitPhone')" @keydown.enter="$emit('submitPhone')">Продолжить
      </Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
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

@Component({
  components: {Button, FormGroup, PhoneMaskInput}
})
export default class PhoneFormVue extends Vue {
  @Prop() readonly form!: PhoneForm;

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
</style>
