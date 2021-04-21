<template>
  <v-col class="mt-3 pa-0">
    <ChangeEmailFormComponent :form="changeEmailForm" @submit="$emit('changeEmail')"/>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="resultPhone" show-custom-error label="Телефон">
        <vue-phone-number-input
            v-model="form.phone"
            v-bind="attrs"
            size="lg"
            :translations="translations"
            :default-country-code="form.defaultCountry"
            @update="changeCode"
            :disabled="true"
            no-example
        />
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="siteLink" show-custom-error label="Ссылка на сайт">
        <input
            class="input input__normal"
            type="text"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="telegram" show-custom-error label="Telegram ID (без @)">
        <input
            class="input input__normal"
            type="text" name="telegram"
            id="telegram"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="vk" show-custom-error label="ВКонтакте ID">
        <input
            class="input input__normal"
            type="text" name="vk"
            id="vk"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="instagram" show-custom-error label="Логин Instagram">
        <input
            class="input input__normal"
            type="text" name="instagram"
            id="instagram"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="facebook" show-custom-error label="Facebook ID">
        <input
            class="input input__normal"
            type="text" name="facebook"
            id="facebook"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div>
      <Button small :disabled="form.disabled" v-on="$listeners">Сохранить
      </Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
  </v-col>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ProfileContactDataForm} from '../../../../form/profile/contactData/ProfileContactDataForm';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import {translations} from '../../../../plugins';
import ChangeEmailFormComponent from '../changeEmail/ChangeEmailFormComponent.vue';
import {ChangeEmailForm} from '../../../../form/changeEmail/changeEmail';

@Component({
  components: {
    ChangeEmailFormComponent,
    FormGroup,
    Button
  }
})
export default class ProfileContactDataFormComponent extends Vue {
  @Prop({ required: true }) readonly form!: ProfileContactDataForm;
  @Prop({ required: true }) readonly changeEmailForm!: ChangeEmailForm;
  translations = translations;

  changeCode(e: any): void {
    this.form.resultPhone = e.formattedNumber;
  }
}
</script>

<style lang="scss" scoped>
.grid-conten {
    min-height: 32px;
}
.bg-purple {
    background: #d3dce6;
}
.contact-info {
  border-radius: 12px !important;
  &__text {
    color: #4F4F4F;
    font-size: 12px;
  }
}
.desc {
  color: #828282;
}
</style>
