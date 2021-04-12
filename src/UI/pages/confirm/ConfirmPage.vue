<template>
  <div v-if="this.$route.query.accountId">
    <v-col v-if="showSuccess" class="confirm_container d-flex flex-column justify-center pa-6">
      <v-icon size="72" color="#27AE60">mdi-checkbox-marked-circle</v-icon>
      <div class="confirm_title mt-4 text-center">Ваша почта успешно подтверждена</div>
      <div class="text-center">
        <Button small @submit="proceed" class="mt-4">Перейти на главную</Button>
      </div>
    </v-col>
    <v-col v-else class="confirm_container d-flex flex-column justify-center pa-6">
      <v-icon size="72" color="error">mdi-close-circle</v-icon>
      <div class="confirm_title mt-4 text-center">Что то пошло не так... Попробуйте отправить ссылку еще раз</div>
      <div class="text-center">
        <Button small @submit="proceed" class="mt-4">Перейти на главную</Button>
      </div>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Button from '../../components/common/Button.vue';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';
import {ConfirmParams} from '../../../entity/common/confirmParams.types';
import {ConfirmEmailStore} from '../../../store/modules/ConfirmEmail';
import {ChangeEmailStore} from '../../../store/modules/ChangeEmail';
@Component({
  components: {Button}
})
export default class ConfirmPage extends Vue {
  showSuccess = false;

  proceed(): void {
    this.$router.push({path: '/'});
  }

  get user(): IUser | null {
    return AuthStore.user;
  }

  async created(): Promise<void> {
    if (this.$route.query.accountId) {
      if (this.$route.params.type === ConfirmParams.Original ) {
        if (await ConfirmEmailStore.confirm({
          code: this.$route.query.code.toString(),
          accountId: parseInt(this.$route.query.accountId.toString())
        })) {
          this.showSuccess = true;
          await AuthStore.fetch();
        } else {
          this.showSuccess = false;
        }
      } else if(this.$route.params.type === ConfirmParams.Changed) {
        if (await ChangeEmailStore.confirm({
          code: this.$route.query.code.toString(),
          accountId: parseInt(this.$route.query.accountId.toString())
        })) {
          this.showSuccess = true;
          await AuthStore.fetch();
        } else {
          this.showSuccess = false;
        }
      }
    }
  }
}
</script>

<style lang="scss">
.confirm_container {
  background: #FFFFFF;
  box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  .confirm_title {
    color: #060516;
    font-weight: bold;
    font-size: 18px;
  }
  button {
    width: auto !important;
  }
}
</style>
