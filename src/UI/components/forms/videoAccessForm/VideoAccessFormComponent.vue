<template>
  <v-col class="pa-6 d-flex justify-center flex-column access_form">
    <h1 class="mx-auto my-0">Получить доступ к видео</h1>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="name" show-custom-error label="Имя"
    >
      <input
          class="input input__normal"
          type="name" name="name"
          id="name"
          v-model="form[attrs.name]"
          v-bind="attrs"
          @input="attrs.change"
      >
    </FormGroup>
    <FormGroup class="mt-4" v-slot="attrs" :form="form" field="phone" :is-phone="true" show-custom-error label="Номер телефона">
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
    <div class="d-flex flex-row justify-space-between mt-2">
      <Button class="secondary_blue mr-3" @submit="$emit('close')">Отмена</Button>
      <Button :disabled="form.disabled" @submit="$emit('access')">Продолжить</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import {VideoAccessForm} from '../../../../form/videoAccess/videoAccessForm';
import {ISelectRegion} from '../../../../entity/common/selectRegion.types';

@Component({
  components: {FormGroup, Button, PhoneMaskInput}
})
export default class VideoAccessFormComponent extends Vue {
  @Prop() readonly form!: VideoAccessForm;
  @Prop() readonly accountId!: number;
  @Prop() readonly infoPackId!: number;

  constructor() {
    super();
    this.form.setFormData(this.accountId, this.infoPackId);
  }

  changeCode(data: ISelectRegion): void {
    this.form.region = '+' + data.dialCode;
    console.log(this.form.region);
  }
}
</script>

<style lang="scss">
.access_form {
  button {
    width: 50%;
  }
}


</style>
