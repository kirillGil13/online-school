<template>
  <v-col class="pa-6 d-flex justify-center flex-column candidate_form">
    <h1 class="mx-auto my-0">Создать кандидата</h1>
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
            @onSelect="changeCode" enabledCountryCode defaultCountry="RU">
        </vue-country-code>
        <input
            class="input input__normal input-phone"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </div>
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
          full-width
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
          full-width
          flat
          dense
          hide-details
          solo
      >
      </v-select>
    </FormGroup>
    <FormGroup v-if="activatorDate"
        class="mt-4 date-time-wrapper" :form="form" field="callTimeFake" label="Укажите время звонка" v-slot="attrs"
    >
      <datetime :phrases="{ok: 'Далее', cancel: 'Закрыть'}" class="date-time input input__normal" type="datetime"
                v-model="form[attrs.name]" v-bind="attrs"/>
      <svg-icon @click="clear" class="delete_content" name="Close"></svg-icon>
    </FormGroup>
    <div class="d-flex flex-row justify-space-between mt-2">
      <Button class="secondary_blue mr-3" small @submit="$emit('close')">Отмена</Button>
      <Button full-width small :disabled="form.disabled" @submit="$emit('add')">Добавить кандидата</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {CandidateForm} from '../../../../form/candidate/candidateForm';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import {IStatuses} from '../../../../entity/statuses/statuses.types';
import {IInfoPackage} from '../../../../entity/infoPackages/infoPackage.types';
import Modal from '../../common/Modal.vue';
import {Datetime} from 'vue-datetime';
import {ISelectRegion} from '../../../../entity/common/selectRegion.types';

@Component({
  components: {Modal, FormGroup, Button, PhoneMaskInput, Datetime}
})
export default class CandidateFormComponent extends Vue {
  @Prop() readonly form!: CandidateForm;
  @Prop() readonly statuses!: IStatuses[];
  @Prop() readonly infoPacks!: IInfoPackage[];
  @Prop() readonly accountId!: number;
  activatorDate = false;

  constructor() {
    super();
    this.form.setFormData(this.statuses, this.infoPacks, this.accountId);
  }

  @Watch('form.statusId', {immediate: true})
  onStatusChange(): void {
    if (this.form.statusId === 3) {
      this.activatorDate = true;
    } else this.activatorDate = false;
  }

  changeCode(data: ISelectRegion): void {
    this.form.region = '+' + data.dialCode;
  }
  clear(): void {
    this.form.callTimeFake = '';
  }
}
</script>

<style lang="scss">
.candidate_form {
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
  .date-time-wrapper {
    position: relative;
    .date-time {
      border: 1px solid #F2F2F2;
      position: relative;
    }
    .delete_content {
      position: absolute;
      cursor: pointer;
      right: 10px;
      bottom: 15px;
      width: 20px !important;
      height: 20px !important;
    }
  }
}

</style>
