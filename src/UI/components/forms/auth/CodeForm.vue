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
  </v-form>
</template>
<script lang="ts">
import {CodeForm} from '../../../../form/code/codeForm';
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';

@Component({
  components: {
    FormGroup,
    Button,
    PhoneMaskInput
  },
})
export default class CodeFormVue extends Vue {
  @Prop() readonly form!: CodeForm;
}
</script>
<style lang="scss">
</style>
