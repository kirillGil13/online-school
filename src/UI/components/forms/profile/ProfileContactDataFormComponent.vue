<template>
  <v-col class="mt-3 pa-0">
    <v-alert
        text
        border="top"
        type="info"
        class="contact-info"
    >
      <div class="contact-info__text">Заполняйте контактные данные корректно! <br>
        На основе этих данных вам будет создаваться персональный лендинг для привлечения новых партнеров.</div>
    </v-alert>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="email" show-custom-error label="Email">
        <input
            class="input input__normal"
            type="email" name="email"
            id="email"
            :disabled="true"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="username" show-custom-error label="Телефон">
        <input
            class="input input__normal"
            type="text" name="username"
            id="username"
            :disabled="true"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="telegram" show-custom-error label="Логин в Telegram">
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
      <FormGroup v-slot="attrs" :form="form" field="vk" show-custom-error label="Страница ВКонтакте">
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
      <FormGroup v-slot="attrs" :form="form" field="instagram" show-custom-error label="Страница Instagram">
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
      <FormGroup v-slot="attrs" :form="form" field="facebook" show-custom-error label="Страница Facebook">
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
  </v-col>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ProfileContactDataForm} from '../../../../form/profile/contactData/ProfileContactDataForm';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';

@Component({
  components: {
    FormGroup,
    Button
  }
})
export default class ProfileContactDataFormComponent extends Vue {
  @Prop({ required: true }) readonly form!: ProfileContactDataForm;
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
</style>
