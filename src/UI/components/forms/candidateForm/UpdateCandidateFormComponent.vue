<template>
  <v-col class="pa-6 d-flex justify-center flex-column candidate_form">
    <h1 class="mx-auto my-0">Редактировать кандидата</h1>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="name" show-custom-error label="Имя"
    >
      <input
          class="input input__normal"
          v-model="form[attrs.name]"
          v-bind="attrs"
          @input="attrs.change"
      >
    </FormGroup>
    <FormGroup class="mt-4" v-slot="attrs" :form="form" field="resultPhone" :is-phone="true" show-custom-error label="Номер телефона">
      <vue-phone-number-input
          v-model="form.phone"
          v-bind="attrs"
          size="lg"
          :translations="translations"
          :default-country-code="form.defaultCountry"
          @update="changeCode"
          no-example
      />
    </FormGroup>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="email" show-custom-error label="Email"
    >
      <input
          class="input input__normal"
          type="email" name="email"
          id="email"
          v-model="form.email"
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
    <FormGroup class="mt-4" v-slot="attrs" :form="form" field="statusId" label="Статус">
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
    <FormGroup v-if="form.statusId === 3"
               class="mt-4 date-time-wrapper" :form="form" field="callTimeFake" label="Укажите время звонка"
               v-slot="attrs"
    >
      <datetime :phrases="{ok: 'Далее', cancel: 'Закрыть'}" class="date-time input input__normal" type="datetime"
                v-model="form[attrs.name]" v-bind="attrs"/>
      <svg-icon @click="clear" class="delete_content" name="Close"></svg-icon>
    </FormGroup>
    <div class="d-flex flex-row justify-space-between mt-2">
      <Button class="secondary_blue mr-3" small @submit="$emit('close')">Отмена</Button>
      <Button full-width small :disabled="form.disabled" @submit="$emit('update')">Изменить</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import {UpdateCandidateForm} from '../../../../form/updateCandidate/updateCandidateForm';
import {Datetime} from 'vue-datetime';

@Component({
  components: {FormGroup, Button, PhoneMaskInput, Datetime}
})
export default class UpdateCandidateFormComponent extends Vue {
  @Prop() readonly form!: UpdateCandidateForm;
  @Prop() readonly accountId!: number;

  translations = {
    countrySelectorLabel: 'Код страны',
    countrySelectorError: '',
    phoneNumberLabel: '',
    example: 'Пример :'
  }

  changeCode(e: any): void {
    if (this.form.phone !== '') {
      this.form.$v['resultPhone'].$touch();
    }
    this.form.resultPhone = e.formattedNumber;
  }

  clear(): void {
    this.form.callTimeFake = '';
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
}


</style>
