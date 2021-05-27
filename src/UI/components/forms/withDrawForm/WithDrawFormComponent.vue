<template>
  <v-col class="pa-6 d-flex justify-center flex-column status_form">
    <h1 class="mx-auto my-0">Вывести</h1>
    <Badge :profit="null" class="mt-6">
      <template v-slot:title>Баланс</template>
      <template v-slot:default>
        {{ form.balance | currency('RUB') }}
      </template>
    </Badge>
    <div class="info-note pa-4 mt-5" v-if="form.person">
      <div class="info-note__label">Юр. лицо</div>
      <div class="font-18 mt-1" style="font-weight: 500">{{form.person}}</div>
    </div>
    <div class="info-note px-4 py-3 mt-5" v-else>
      <div class="font-16" style="font-weight: 500">У вас не указано юр. лицо</div>
      <div class="my-2">Перейдите в профиль и заполните форму для вывода</div>
      <div class="link" style="cursor: pointer" @click="$router.push({name: $routeRules.Profile})">Заполнить форму</div>
    </div>
    <FormGroup
        class="mt-6" v-slot="attrs" :form="form" field="sum" show-custom-error label="Сумма вывода"
    >
      <input
          class="input input__normal"
          type="text" name="name"
          id="name"
          :disabled="!!form.person === false"
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
import Badge from '../../common/Badge.vue';
import InfoNote from '../../common/InfoNote.vue';
@Component({
  components: {InfoNote, Badge, Button, FormGroup}
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
