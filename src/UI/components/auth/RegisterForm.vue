<template>
  <v-form class="form mt-8" @submit.prevent enctype="multipart/form-data">
    <div class="d-flex align-center flex-column">
      <v-avatar height="100" width="100" color="#F0F2F6">
        <template v-slot:default v-if="form.avatar">
          <img :src="form.avatar" alt="">
        </template>
        <template v-slot:default v-else>
          <svg-icon class="avatar-icon" name="Camera"></svg-icon>
        </template>
      </v-avatar>
      <div class="mb-6 mt-2">
        <FormGroup :form="form" field="file">
          <template v-slot:default>
            <label class="upload-label" for="upload">Фото профиля</label>
            <input type="file" accept="image/*" id="upload" @change="handleImage($event)">
          </template>
        </FormGroup>
      </div>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="name" show-custom-error label="Имя">
        <input
            class="input input__normal"
            type="name" name="name"
            id="name"
            v-model="form[attrs.name]"
            v-bind="attrs"
            placeholder="Введите имя"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="surname" show-custom-error label="Фамилия">
        <input
            class="input input__normal"
            type="surname" name="surname"
            id="surname"
            v-model="form[attrs.name]"
            v-bind="attrs"
            placeholder="Введите фамилию"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="email" show-custom-error label="Email">
        <input
            class="input input__normal"
            type="email" name="email"
            id="email"
            v-model="form[attrs.name]"
            v-bind="attrs"
            placeholder="Введите email"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="password" show-custom-error label="Пароль">
        <input
            class="input input__normal"
            type="password" name="password"
            id="password"
            v-model="form[attrs.name]"
            v-bind="attrs"
            placeholder="Введите пароль"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="confirm_password" show-custom-error label="Повторите пароль">
        <input
            class="input input__normal"
            type="password" name="confirm_password"
            id="confirm_password"
            v-model="form[attrs.name]"
            v-bind="attrs"
            placeholder="Повторите пароль"
            @input="attrs.change"
        >
      </FormGroup>
    </div>

    <div>
      <FormGroup v-slot="attrs" :form="form" field="phone" label="Номер телефона">
        <PhoneMaskInput
            v-model="form.phone"
            v-bind="attrs"
            autoDetectCountry
            flagSize="normal"
            inputClass="input"
            showFlag
            wrapperClass="wrapper"
            ref="phoneMaskInput"
            :disabled="true"
        />
      </FormGroup>
    </div>
    <div>
      <Button class="form-button" full-width :disabled="form.disabled" type="submit" v-on="$listeners">Завершить регистрацию
      </Button>
    </div>
    <v-divider class="mt-6 mb-6"></v-divider>
    <div class="d-flex justify-center rules">
      <div>
        Регистрируясь, вы принимаете условия <br>
        <a href="#">Пользовательского соглашения</a> и <a href="#">Политики конфиденциальности</a>
      </div>
    </div>
  </v-form>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '../common/Button.vue';
import {RegisterForm} from '../../../form/register/RegisterForm';
import FormGroup from '../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';

@Component({
  components: {
    FormGroup,
    Button,
    PhoneMaskInput,
  },
})
export default class RegisterFormVue extends Vue {
  @Prop() readonly form!: RegisterForm;

  handleImage(e: any): void {
    const selectedImage = e.target.files[0];
    this.createBase64Image(selectedImage);
  }
  createBase64Image(fileObject: Blob): void {
    const reader = new FileReader();

    reader.onload = (e: any): void => {
      this.form.avatar = e.target.result;
    }
    reader.readAsDataURL(fileObject);
  }
}
</script>
<style lang="scss">
.rules {
  div {
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
}
.avatar-icon {
  width: 36px !important;
  height: 36px !important;
}
</style>
