<template>
  <div>
    <h2 class="form-title">Регистрация</h2>
    <template v-if="!registerStep">
      <PhoneFormVue v-if="!codeStep" :form="phoneForm" @submitPhone="submitPhone"/>
      <CodeFormVue v-else :form="codeForm" @submitCode="submitCode" @sendAgain="submitPhone" :show-alert="show"/>
    </template>
    <RegisterFormVue v-else :form="registerForm" :link="pictureLoaded ? picture.fullLink : ''"
                     @handleImage="handleImage" @submit="submitRegister" @keydown.enter="submitRegister"/>
    <Alert :show="show" :type="alertType.Success"
           text="Код успешно отправлен"
           @show="showAlert"/>
    <Modal :activator="activator" @activatorChange="activatorChange">
      <template v-slot:content v-if="destroy">
        <PictureCropper :image="image" @close="close" @setImage="setImage"/>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LoginFormVue from '../../components/forms/auth/RegisterForm.vue';
import CodeFormVue from '../../components/forms/auth/CodeForm.vue';
import Profile from '../profile/Profile.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import {AuthStore} from '@/store/modules/Auth';
import Logo from '@/UI/components/common/Logo.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import Button from '../../components/common/Button.vue';
import {CodeForm} from '../../../form/code/codeForm';
import RegisterFormVue from '../../components/forms/auth/RegisterForm.vue';
import {RegisterForm} from '../../../form/register/RegisterForm';
import PhoneFormVue from '../../components/forms/auth/PhoneForm.vue';
import {PhoneForm} from '../../../form/phone/phoneForm';
import {ProfilePictureStore} from '../../../store/modules/ProfilePicture';
import {IProfilePicture} from '../../../entity/common/profilePicture.types';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import Alert from '../../components/common/Alert.vue';
import Modal from '../../components/common/Modal.vue';
import PictureCropper from '../../components/cropper/PictureCropper.vue';
import {LoginForm} from '../../../form/login';

@Component({
  components: {
    PictureCropper,
    Modal,
    Alert,
    PhoneFormVue,
    RegisterFormVue,
    Button,
    FormGroup,
    LoginFormVue,
    CodeFormVue,
    Profile,
    Logo,
    PhoneMaskInput,
  },
})
export default class Signup extends Vue {
  codeForm = new CodeForm();
  phoneForm = new PhoneForm();
  registerForm = new RegisterForm();
  form = new LoginForm();
  codeStep = false;
  registerStep = false;
  show = false;
  activator = false;
  image = '';
  destroy = true;
  alertType = AlertTypeEnum;

  get picture(): IProfilePicture | null {
    return ProfilePictureStore.profilePicture;
  }

  get pictureLoaded(): boolean {
    return ProfilePictureStore.profilePictureLoaded;
  }

  close(): void {
    this.activator = false;
  }

  showAlert(show: boolean): void {
    this.show = show;
  }

  activatorChange(act: boolean): void {
    this.activator = act;
    this.image = '';
    this.rerender();
  }

  rerender(): void {
    this.destroy = false;
    this.$nextTick(() => {
      this.destroy = true;
    });
  }

  handleImage(e: any): void {
    const file = e.target.files[0];
    if (file) {
      this.createBase64(file);
      this.activator = true;
    }
  }

  createBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any): void => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  async setImage(data: any): Promise<void> {
    const {canvas} = data.getResult();
    canvas.toBlob((blob: Blob): void => {
          ProfilePictureStore.set({file: blob as any});
        }
    );
    this.activator = false;
  }

  async submitPhone(again?: boolean): Promise<boolean> {
    this.form.sendingRequest = true;
    if (process.env.NODE_ENV === 'production') {
      await this.$recaptchaLoaded();
      const token = await this.$recaptcha('sendCode');
      if (token) {
        this.phoneForm.token = token;
        const res = await this.phoneForm.submit(AuthStore.sendCode);
        if (!again) {
          if (res) {
            this.phoneForm.clearErrors();
            this.codeStep = true;
            this.codeForm.phone = this.phoneForm.getFormData().phone_number;
            return true;
          } else {
            this.codeStep = false;
            return false;
          }
        } else {
          if (res) {
            this.show = true;
            return true;
          }
          return false;
        }
      }
      return true;
    } else {
      const res = await this.phoneForm.submit(AuthStore.sendCode);
      if (!again) {
        if (res) {
          this.phoneForm.clearErrors();
          this.codeStep = true;
          this.codeForm.phone = this.phoneForm.getFormData().phone_number;
          return true;
        } else {
          this.codeStep = false;
          return false;
        }
      } else {
        if (res) {
          this.show = true;
          return true;
        }
        return false;
      }
    }
  }

  async submitCode(): Promise<boolean> {
    const res = await this.codeForm.submit(AuthStore.checkCode);
    if (res) {
      this.registerForm.setFormData(this.codeForm.getFormData().phone_number);
      this.registerStep = true;
      return true;
    } else return false;
  }

  async submitRegister(): Promise<boolean> {
    if (this.picture !== null) {
      this.registerForm.photoLink = this.picture!.shortLink;
    }
    if (await this.registerForm.submit(AuthStore.register)) {
      return true;
    } else return false;
  }

}
</script>
<style lang="scss">
.v-input:not(.v-input--is-focused) {
  fieldset {
    border-color: #f2f2f2 !important;
  }
}

.form-title {
  font-size: 24px;
  text-align: center;
}
</style>
