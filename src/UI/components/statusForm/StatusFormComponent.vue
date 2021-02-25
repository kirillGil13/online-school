<template>
  <v-col class="pa-6 d-flex justify-center flex-column status_form">
    <h1 class="mx-auto my-0">Добавить статус</h1>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="photoLink" show-custom-error label="Выберите иконку статуса"
    >
      <v-radio-group row hide-details v-model="form[attrs.name]" v-bind="attrs" class="status_radio">
        <v-radio
            v-for="n in 3"
            :key="n"
            :value="form[attrs.name]"
        >
          <template v-slot:label>
            <v-img class="status_img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Hors_category_22px.svg/1024px-Hors_category_22px.svg.png" max-height="22" max-width="22"></v-img>
          </template>
        </v-radio>
      </v-radio-group>
    </FormGroup>
    <FormGroup
        class="mt-4" v-slot="attrs" :form="form" field="name" show-custom-error label="Название"
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
      <Button class="secondary_blue mr-3" @submit="$emit('close')">Отмена</Button>
      <Button :disabled="form.disabled" @submit="$emit('createStatus')">Добавить статус</Button>
    </div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{form.getErrors('0')[0]}}</div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {StatusForm} from '../../../form/status/statusForm';
import FormGroup from '../common/form/FormGroup.vue';
import Button from '../common/Button.vue';
@Component({
  components: {Button, FormGroup}
})
export default class StatusFormComponent extends Vue{
  @Prop() readonly form!: StatusForm;
}
</script>

<style lang="scss">
.status_form {
  button {
    width: 50%;
  }
}
</style>