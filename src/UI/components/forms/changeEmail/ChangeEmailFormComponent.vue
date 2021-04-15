<template>
  <div class="mb-3">
    <FormGroup v-slot="attrs" :form="form" field="email" show-custom-error label="Email">
      <div class="d-flex flex-row">
        <input
            class="input input__normal"
            type="email" name="email"
            id="email"
            v-model="form[attrs.name]"
            v-bind="attrs"
            @input="attrs.change"
        >
          <Button small class="mt-0 ml-3" v-on="$listeners">Сменить адрес</Button>
      </div>
    </FormGroup>
    <div class="info-desc mt-1 ml-4">На указанный Вами адрес электронной почты будет выслана ссылка-подтверждение.</div>
    <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ChangeEmailForm} from '../../../../form/changeEmail/changeEmail';
import FormGroup from '../../common/form/FormGroup.vue';
import Button from '../../common/Button.vue';
@Component({
  components: {Button, FormGroup}
})
export default class ChangeEmailFormComponent extends Vue {
  @Prop({required: true}) readonly form!: ChangeEmailForm;
}
</script>

<style lang="scss">

</style>
