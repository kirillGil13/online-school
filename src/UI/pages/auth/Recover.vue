<template>
  <div>
    <h2 class="form-title text-center">Восстановаление пароля</h2>
    <SendCodeFormComponent v-if="!$route.query.accountId" :form="sendCodeForm" @sendCode="sendCode"/>
    <template v-else>
      <CheckCodeFormComponent v-if="!recoverCodeStep" :form="checkCodeForm" @checkCode="checkCode"/>
      <RecoverDoFormComponent v-else :form="doCodeForm" @doRecover="doRecover"/>
    </template>
    <Alert :type="alertTypes.Success" text="Ссылка отправлена" :show="showSendCode"/>
    <Alert :type="alertTypes.Success" text="Данные корректны" :show="showCheckCode"/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SendCodeFormComponent from '../../components/forms/recover/sendCodeForm/SendCodeFormComponent.vue';
import {RecoverSendCodeForm} from '../../../form/recover/recoverSendCode/recoverSendCodeForm';
import {RecoverStore} from '../../../store/modules/Recover';
import CheckCodeFormComponent from '../../components/forms/recover/checkCodeForm/CheckCodeFormComponent.vue';
import {RecoverCheckForm} from '../../../form/recover/recoverCheck/recoverCheckForm';
import Alert from '../../components/common/Alert.vue';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import RecoverDoFormComponent from '../../components/forms/recover/recoverDoForm/RecoverDoFormComponent.vue';
import {RecoverDoForm} from '../../../form/recover/recoverDo/recoverDoForm';
import {RouterNameEnum} from '../../../router/router.types';
@Component({
  components: {RecoverDoFormComponent, Alert, CheckCodeFormComponent, SendCodeFormComponent}
})
export default class Recover extends Vue {
  alertTypes = AlertTypeEnum;
  showSendCode = false;
  showCheckCode = false;
  recoverCodeStep = false;
  sendCodeForm = new RecoverSendCodeForm();
  checkCodeForm = new RecoverCheckForm();
  doCodeForm = new RecoverDoForm();

  async sendCode(): Promise<void> {
    if (await this.sendCodeForm.submit(RecoverStore.sendCode)) {
      this.showSendCode = true;
    }
  }

  async checkCode(): Promise<void> {
    if (await this.checkCodeForm.submit(RecoverStore.checkCode)) {
      this.doCodeForm.setFormData(this.$route.query.accountId.toString(), this.$route.query.code.toString());
      this.showCheckCode = true;
      this.recoverCodeStep = true;
    }
  }

  async doRecover(): Promise<void> {
    if (await this.doCodeForm.submit(RecoverStore.recoverDo)) {
      await this.$router.push({name: RouterNameEnum.AuthLogin});
    }
  }

  created(): void {
    if (this.$route.query.accountId){
      this.checkCodeForm.setFormData(this.$route.query.accountId.toString(), this.$route.query.code.toString());
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
