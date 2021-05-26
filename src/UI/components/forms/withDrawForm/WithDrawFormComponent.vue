<template>
  <v-col class="pa-6 d-flex justify-center flex-column status_form">
    <h1 class="mx-auto my-0">Вывести</h1>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="sum" show-custom-error label="Сумма вывода"
    >
      <input
          class="input input__normal"
          type="text" name="name"
          id="name"
          v-model="form[attrs.name]"
          v-bind="attrs"
          @input="attrs.change"
      >
    </FormGroup>
    <div class="d-flex flex-row justify-space-between mt-2">
      <Button class="mr-3" full-width small :disabled="form.disabled" @submit="$emit('sendRequest')">Отправить заявку</Button>
      <Button class="secondary_blue" small @submit="$emit('close')">Отмена</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import FormGroup from '../../common/form/FormGroup.vue';
import Button from '../../common/Button.vue';
import {WithDrawForm} from '../../../../form/withDraw/withDrawForm';
@Component({
  components: {Button, FormGroup}
})
export default class StatusFormComponent extends Vue{
  @Prop() readonly form!: WithDrawForm;
}
</script>

<style lang="scss">
.status_form {
  .icons {
    label {
      margin-left: 0 !important;
    }
  }
}
</style>
