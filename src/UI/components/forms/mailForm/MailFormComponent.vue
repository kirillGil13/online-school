<template>
  <v-col class="pa-6 d-flex justify-center flex-column mail_form">
    <h1 class="mx-auto my-0">Создать курс</h1>
    <div class="text-center mt-3"><font color="#828282">Заполните форму ниже, и наши менеджеры свяжутся с Вами для дальнейшего обсуждения Вашего курса</font></div>
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
    <FormGroup class="mt-4" v-slot="attrs" :form="form" field="resultPhone" :is-phone="true" show-custom-error label="Номер телефона">
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
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="mlmLevel" show-custom-error label="Укажите ваш МЛМ уровень"
    >
      <input
          class="input input__normal"
          v-model="form[attrs.name]"
          v-bind="attrs"
      >
    </FormGroup>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="topic" show-custom-error label="Название"
    >
      <input
          class="input input__normal"
          type="text" name="topic"
          id="topic"
          v-model="form[attrs.name]"
          v-bind="attrs"
          @input="attrs.change"
      >
    </FormGroup>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="description" show-custom-error label="Описание"
    >
      <v-textarea
          class="input input__normal text-area"
          row-height="10"
          rows="1"
          color="#000000"
          auto-grow
          hide-details
          single-line
          v-model="form[attrs.name]"
          v-bind="attrs"
          @input="attrs.change"
      >
      </v-textarea>
    </FormGroup>
    <FormGroup class="mt-4" v-slot="attrs" :form="form" field="levelId" label="Уровень  ">
      <v-select
          :items="form.levelList"
          v-model="form[attrs.name]"
          id="levelId"
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
    <div class="d-flex flex-row justify-space-between mt-2">
      <Button class="secondary_blue mr-3" small @submit="$emit('close')">Отмена</Button>
      <Button full-width small :disabled="form.disabled" @submit="$emit('add')">Отправить</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import {ICourseLevels} from '../../../../entity/courseLevels/courseLevels.types';
import {MailForm} from '../../../../form/mail/mailForm';
import {translations} from '../../../../plugins';

@Component({
  components: {FormGroup, Button, PhoneMaskInput}
})
export default class MailFormComponent extends Vue {
  @Prop() readonly form!: MailForm;
  @Prop() readonly levels!: ICourseLevels[];
  translations = translations;

  constructor() {
    super();
    this.form.setFormData(this.levels);
  }

  changeCode(e: any): void {
    if (this.form.phone !== '') {
      this.form.$v['resultPhone'].$touch();
    }
    this.form.resultPhone = e.formattedNumber;
  }
}
</script>

<style lang="scss">
.mail_form {
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

  .text-area {
    border: none !important;
    font-size: 14px !important;

    .v-input__control {
      border: none !important;

      .v-input__slot {
        padding-left: 16px !important;

        label {
          display: none !important;
        }

        fieldset {
          border: 1px solid #F2F2F2;
        }
      }

      .v-text-field__slot {
        textarea {
          max-height: 196px;
          overflow: scroll;
        }
      }
    }
  }
}

</style>
