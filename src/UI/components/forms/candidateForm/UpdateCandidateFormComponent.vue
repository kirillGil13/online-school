<template>
  <v-col class="pa-6 d-flex justify-center flex-column candidate_form">
    <h1 class="mx-auto my-0">Редактировать кандидата</h1>
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
    <FormGroup class="mt-4" v-slot="attrs" :form="form" field="phoneValid" show-custom-error label="Номер телефона">
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
    </FormGroup>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="email" show-custom-error label="Email"
    >
      <input
          class="input input__normal"
          type="email" name="email"
          id="email"
          v-model="form[attrs.name]"
          v-bind="attrs"
          @input="attrs.change"
      >
    </FormGroup>
    <FormGroup class="mt-4" v-slot="attrs" :form="form" field="product" label="Продукт">
      <v-select
          :items="form.productList"
          v-model="form[attrs.name]"
          id="product"
          :menu-props="{ left: true}"
          v-bind="attrs"
          class="select"
          no-data-text="Данные не найдены"
          flat
          dense
          hide-details
          solo
      >
      </v-select>
    </FormGroup>
    <FormGroup class="mt-4" v-slot="attrs" :form="form" field="status" label="Статус">
      <v-select
          :items="form.statusList"
          v-model="form[attrs.name]"
          id="status"
          :menu-props="{ left: true}"
          v-bind="attrs"
          class="select"
          no-data-text="Данные не найдены"
          flat
          dense
          hide-details
          solo
      >
      </v-select>
    </FormGroup>
    <div class="d-flex flex-row justify-space-between mt-2">
      <Button class="secondary_blue mr-3" @submit="$emit('close')">Отмена</Button>
      <Button :disabled="form.disabled" @submit="$emit('update')">Изменить</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {CandidateForm} from '../../../../form/candidate/candidateForm';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
@Component({
  components: {FormGroup, Button, PhoneMaskInput}
})
export default class UpdateCandidateFormComponent extends Vue {
  @Prop() readonly form!: CandidateForm;
  @Prop() readonly accountId!: number;

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
.candidate_form {
  h1 {
    text-align: center;
  }
  .select {
    border: 1px solid #f2f2f2 !important;
    padding: 4px !important;
    font-size: 14px !important;

    .v-input__control {
      border: none !important;

      fieldset {
        border: none !important;
      }
    }
  }

  button {
    width: 50%;
  }
}


</style>