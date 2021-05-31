<template>
  <v-form class="mt-3 pa-0 documents-form" @submit.prevent>
    <InfoNote v-if="form.statusName !== statusName.REJECTED" class="mb-6"
              :title="form.statusName === statusName.EMPTY ? 'Заполните форму для вывода средств с Кабинета лидера' : 'Изменение анкеты'"
              :subtitle="form.statusName === statusName.EMPTY ? 'После модерации вашей анкеты, вам будет доступен вывод средств' : 'Вывод будет недоступен, пока изменения не пройдут модерацию'"/>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="name" show-custom-error label="Ваши имя и фамилия">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="email" show-custom-error label="Ваш e-mail">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="resultPhone" :is-phone="true" show-custom-error
                 label="Контактный телефон">
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
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="company" show-custom-error label="Название компании">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="inn" show-custom-error label="ИНН">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="kpp" show-custom-error label="КПП">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="ogrn" show-custom-error label="ОГРН">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="legalAddr" show-custom-error label="Юридический адрес">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="postAddr" show-custom-error label="Почтовый адрес">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="fullNameSignatory" show-custom-error
                 label="ФИО подписывающего лица">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="positionSignatory" show-custom-error
                 label="Должность подписывающего лица">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="nds" show-custom-error label="Информация об НДС">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="bankName" show-custom-error label="Наименование банка">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="bik" show-custom-error label="БИК">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="corr" show-custom-error label="Корреспондентский счет">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="checkingAccount" show-custom-error
                 label="Расчетный счет организации или ИП">
        <input
            class="input input__normal"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mt-2">
      <Button small :disabled="form.disabled" v-on="$listeners">Отправить на проверку</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
  </v-form>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import {ProfileDocumentsForm} from '../../../../form/profile/documents/profileDocumentsForm';
import {translations} from '../../../../plugins';
import Notification from '../../note/Notification.vue';
import InfoNote from '../../common/InfoNote.vue';
import {ProfileDocsStatusEnum} from '../../../../entity/profileDocs/profileDocs.types';

@Component({
  components: {
    InfoNote,
    Notification,
    FormGroup,
    Button
  },
})
export default class ProfileDocumentsFormComponent extends Vue {
  @Prop({required: true}) readonly form!: ProfileDocumentsForm;
  statusName = ProfileDocsStatusEnum;

  translations = translations;

  changeCode(e: any): void {
    if (this.form.phone !== '') {
      this.form.$v['resultPhone'].$touch();
    }
    this.form.resultPhone = e.formattedNumber;
  }
}
</script>

<style lang="scss" scoped>
</style>
