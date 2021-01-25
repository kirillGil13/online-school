<template>
  <div class="content">
    <v-form class="form" @submit.prevent="submit">
      <div class="pa-6">
        <Logo font-size="24px" height="38px" width="38px"/>
        <div class="my-9">
          <div class="form-text-container" v-if="form.codeStep">
            <div class="desc">Подтвердите номер телефона <br>{{ form.getFullPhone() }} введите код из СМС</div>
          </div>
          <FormGroup
              v-if="!form.codeStep"
              :messages="form.messages.phone"
              :server-errors="form.getErrors('phone')"
              :validator="form.$v.phone"
          >
            <template v-slot:label>
              <label for="phone">Номер телефона</label>
            </template>
            <template v-slot:input="{attrs}">
              <PhoneMaskInput
                  v-model="form.phone"
                  v-bind="attrs"
                  autoDetectCountry
                  showFlag
                  id="phone"
                  inputClass="input"
                  wrapperClass="wrapper"
                  flagSize="normal"
              />
            </template>
          </FormGroup>
          <FormGroup
              v-else
              :messages="form.messages.code"
              :server-errors="form.getErrors('code')"
              :validator="form.$v.code"
          >
            <template v-slot:label>
              <label for="code">Код из СМС</label>
            </template>
            <template v-slot:input="{attrs}">
              <input
                  class="input input__normal"
                  type="text" name="code"
                  id="code"
                  @input="form.$v.code.$touch()"
                  v-model="form.code"
                  v-bind="attrs"
              >
            </template>
          </FormGroup>
        </div>
        <div>

          <Button :disabled="form.$v.$invalid" @submit="submit">Продолжить</Button>
        </div>
      </div>
    </v-form>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LoginFormVue from '../../components/auth/LoginForm.vue';
import CodeFormVue from '../../components/auth/CodeForm.vue';
import {LoginForm} from '@/form/login/LoginForm';
//import user from '@/store/modules/users';
import Profile from '../profile/Profile.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import Button from '@/UI/components/common/Button.vue';
import {AuthStore} from '@/store/modules/Auth';
import Logo from '@/UI/components/common/Logo.vue';
import PhoneMaskInput from 'vue-phone-mask-input';

@Component({
  components: {
    Button,
    FormGroup,
    LoginFormVue,
    CodeFormVue,
    Profile,
    Logo,
    PhoneMaskInput
  },
})
export default class Login extends Vue {
  form = new LoginForm();

  submit(): boolean {
    if (this.form.codeStep) {
      AuthStore.login(this.form.getFormData());
    } else {
      // AuthStore.getTwofaCode(this.form.phone);
      this.form.codeStep = true;
    }

    return false;
  }
}
</script>
<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;

  .content {
    justify-content: center;
    align-items: center;

    .logo {
      justify-content: center !important;
      margin-right: 10px;
      margin-bottom: 36px;
    }

    .v-input:not(.v-input--is-focused) {
      fieldset {
        border-color: #F2F2F2 !important;
      }
    }

    .success--text {
      fieldset {
        border-color: #F2F2F2 !important;
      }
    }

    .error--text {
      color: rgba(255, 0, 0, 0.7) !important;
    }

    .input {
      padding: 12px 16px 12px 16px;
      border-style: solid;
      border-radius: 5px 0 0 5px;

      &__normal {
        border-radius: 5px;
      }
    }

    .flag-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #F2F2F2;
      width: 12%;
      background-color: #ecebeb;
      border-radius: 0 5px 5px 0;
    }

    .wrapper {
      display: flex;
      flex-direction: row;
    }

    button {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 12px;
    }
  }
}


</style>
