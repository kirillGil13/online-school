<template>
  <v-form class="form" @submit.prevent="$emit('checkCode')">
    <div class="mt-9 mb-3">
      <FormGroup v-slot="attrs" :form="form" field="code" show-custom-error label="Код">
        <input
            class="input input__normal"
            type="code"
            :disabled="true"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
      </FormGroup>
    </div>
    <div>
      <Button small full-width :disabled="form.disabled" type="submit" @submit="$emit('checkCode')" @keydown.enter="$emit('checkCode')">Отправить код</Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {RecoverCheckForm} from '../../../../../form/recover/recoverCheck/recoverCheckForm';
import FormGroup from '../../../common/form/FormGroup.vue';
import Button from '../../../common/Button.vue';
@Component({
  components: {Button, FormGroup}
})
export default class CheckCodeFormComponent extends Vue {
  @Prop({required: true}) readonly form!: RecoverCheckForm;
}
</script>

<style lang="scss">

</style>
