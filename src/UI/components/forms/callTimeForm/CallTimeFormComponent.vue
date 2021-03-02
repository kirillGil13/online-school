<template>
  <v-col class="pa-6 d-flex justify-center flex-column call-time-form">
    <h1 class="mx-auto my-0">Позвонить {{candidate.name}}</h1>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="callTimeFake" show-custom-error label="Укажите время звонка"
    >
      <Datetime :phrases="{ok: 'Далее', cancel: 'Закрыть'}" class="date-time input input__normal" type="datetime"
                v-model="form[attrs.name]" v-bind="attrs"/>
    </FormGroup>
    <div class="d-flex flex-row justify-space-between mt-2">
      <Button class="secondary_blue mr-3" @submit="$emit('close')">Не указывать время</Button>
      <Button :disabled="form.disabled" @submit="$emit('save')">Сохранить</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import FormGroup from '../../common/form/FormGroup.vue';
import Button from '../../common/Button.vue';
import {AdaptiveStore} from '../../../../store/modules/Adaptive';
import {ICandidate} from '../../../../entity/candidates';
import {CallTimeForm} from '../../../../form/callTime/callTimeForm';
import {Datetime} from 'vue-datetime';
@Component({
  components: {Button, FormGroup, Datetime}
})
export default class StatusFormComponent extends Vue{
  @Prop() readonly form!: CallTimeForm;
  @Prop() readonly candidate!: ICandidate;

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }
}
</script>

<style lang="scss">
.call-time-form {
  button {
    width: 50%;
  }
  .date-time {
    border: 1px solid #F2F2F2;
  }
}
</style>