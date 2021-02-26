<template>
  <v-form class="form mt-8" @submit.prevent enctype="multipart/form-data">
    <div class="d-flex align-center flex-column">
      <v-avatar v-model="form.photoLink" width="100" height="100" color="#F0F2F6">
        <template v-slot:default v-if="form.photoLink">
          <v-img :src="form.photoLink" aspect-ratio="1"></v-img>
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
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="lastName" show-custom-error label="Фамилия">
        <input
            class="input input__normal"
            type="surname" name="lastName"
            id="lastName"
            v-model="form[attrs.name]"
            v-bind="attrs"
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
            @input="attrs.change"
        >
      </FormGroup>
    </div>

    <div>
      <FormGroup v-slot="attrs" :form="form" field="phoneNumber" label="Номер телефона">
        <PhoneMaskInput
            v-model="form.phoneNumber"
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
      <Button class="small" full-width :disabled="form.disabled" type="submit" v-on="$listeners">Завершить регистрацию
      </Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
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
import Button from '../../common/Button.vue';
import {RegisterForm} from '../../../../form/register/RegisterForm';
import FormGroup from '../../common/form/FormGroup.vue';
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
      this.form.photoLink = e.target.result;
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
.avatar {
  background: #F0F2F6 no-repeat;
  width: 100px;
  height: 100px;
  background-size: cover;
}
.avatar-icon {
  width: 36px !important;
  height: 36px !important;
}
</style>
