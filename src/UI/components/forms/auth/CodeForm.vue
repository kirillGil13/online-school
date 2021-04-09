<template>
  <v-form class="form code-form" @submit.prevent>
    <div class="d-flex justify-center form-desc mt-9">
      <div>
        Подтвердите номер телефона <br>
        {{ form.phone }} введите код из СМС
      </div>
    </div>
    <div>
      <FormGroup v-slot="attrs" :form="form" field="code" show-custom-error label="Код">
        <input
            class="input input__normal"
            type="code" name="code"
            id="code"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div>
      <Button small full-width :disabled="form.disabled" type="submit" @submit="$emit('submitCode')" @keydown.enter="$emit('submitCode')">Подтвердить
      </Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
    </div>
    <div class="d-flex justify-center form-desc mt-3">
      <div class="d-flex justify-center flex-row">
        <div v-if="!show">
          <span class="mr-1">Вы сможете отправить код повторно через</span>
          <Timer :current-time="60" @stop="show = true"/>
        </div>
        <div v-else class="d-flex justify-center">
          <div class="form-second-action" @click="$emit('sendAgain', true)">Отправить код повторно</div>
        </div>
      </div>
    </div>
  </v-form>
</template>
<script lang="ts">
import {CodeForm} from '../../../../form/code/codeForm';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import Timer from '../../common/Timer.vue';

@Component({
  components: {
    Timer,
    FormGroup,
    Button,
    PhoneMaskInput
  },
})
export default class CodeFormVue extends Vue {
  @Prop() readonly form!: CodeForm;
  @Prop() readonly showAlert!: boolean;
  show = false;

  @Watch('showAlert')
  onShowAlertChange(): void {
    if (this.showAlert) {
      this.show = false;
    }
  }
}
</script>
<style lang="scss">
.timer {
  width: auto;
  height: auto;
  background: transparent;
  font-weight: bold;
  color: #5f739c;
  margin-top: 0;
}
.form-second-action {
  color: #1976d2;
  cursor: pointer;
}
</style>
