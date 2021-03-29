<template>
  <v-form class="form" @submit.prevent="$emit('doRecover')">
    <div class="d-flex justify-center form-desc mt-9">
      <div>
        Введите новый пароль
      </div>
    </div>
    <div class="mt-9 mb-3">
      <FormGroup v-slot="attrs" :form="form" field="code" show-custom-error label="Код">
        <input
            :disabled="true"
            class="input input__normal"
            type="code"
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
            type="password"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div class="mb-3">
      <FormGroup v-slot="attrs" :form="form" field="confirmPassword" show-custom-error label="Повторите пароль">
        <input
            class="input input__normal"
            type="password"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div>
      <Button small full-width :disabled="form.disabled" type="submit" @submit="$emit('doRecover')" @keydown.enter="$emit('doRecover')">Восстановить пароль</Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {RecoverDoForm} from '../../../../../form/recover/recoverDo/recoverDoForm';
import FormGroup from '../../../common/form/FormGroup.vue';
import Button from '../../../common/Button.vue';
@Component({
  components: {Button, FormGroup}
})
export default class RecoverDoFormComponent extends Vue {
  @Prop({required: true}) readonly form!: RecoverDoForm;
}
</script>

<style lang="scss">

</style>
