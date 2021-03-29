<template>
  <v-form class="form" @submit.prevent="$emit('sendCode')">
    <div class="d-flex justify-center form-desc mt-9">
      <div>
        На указанную Вами электронную <br>
        почту придет ссылка для восстановаления пароля.<br>
        Если письма не оказалось во входящих,<br> проверьте папку <strong>Спам</strong>
      </div>
    </div>
    <div class="mt-9 mb-3">
      <FormGroup v-slot="attrs" :form="form" field="username" show-custom-error label="Email">
        <input
            class="input input__normal"
            type="email"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div>
      <Button small full-width :disabled="form.disabled" type="submit" @submit="$emit('sendCode')">Получить ссылку</Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
    </div>
    <div class="d-flex justify-center">
      <router-link class="form-second-action mt-6" :to="{ name: $routeRules.AuthLogin }">Вернуться к входу</router-link>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {RecoverSendCodeForm} from '../../../../../form/recover/recoverSendCode/recoverSendCodeForm';
import FormGroup from '../../../common/form/FormGroup.vue';
import Button from '../../../common/Button.vue';
@Component({
  components: {Button, FormGroup}
})
export default class SendCodeFormComponent extends Vue {
  @Prop({required: true}) readonly form!: RecoverSendCodeForm;
}
</script>

<style lang="scss">

</style>
