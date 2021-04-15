<template>
    <v-form class="mt-3 pa-0 main-info" @submit.prevent>
        <div class="mb-3">
          <FormGroup v-slot="attrs" :form="form" field="name" show-custom-error label="Имя">
            <input
                class="input input__normal"
                type="name" name="name"
                id="name"
                v-model="form[attrs.name]"
                v-bind="attrs"
                @input="attrs.change"
            >
          </FormGroup>
        </div>
        <div class="mb-3">
          <FormGroup v-slot="attrs" :form="form" field="surname" show-custom-error label="Фамилия">
            <input
                class="input input__normal"
                type="surname" name="surname"
                id="surname"
                v-model="form[attrs.name]"
                v-bind="attrs"
                @input="attrs.change"
            >
          </FormGroup>
        </div>
        <div class="mb-1">
          <FormGroup
               v-slot="attrs" :form="form" field="description" show-custom-error label="Обо мне"
          >
            <textarea
                rows="8"
                class="input input__normal text-area"
                v-model="form[attrs.name]"
                v-bind="attrs"
                @input="attrs.change"
            ></textarea>
          </FormGroup>
        </div>
        <div class="info-desc ml-6">Расскажите о том, каких успехов вы достигли как лидер, про ваш опыт. Эту ифнормацию будут видеть ваши клиенты, просматривая вашу страницу или изучая ваши курсы.</div>
        <div class="mt-2">
          <Button small :disabled="form.disabled" v-on="$listeners">Сохранить
          </Button>
        </div>
        <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProfileMainInfoForm } from '../../../../form/profile/mainInfo/ProfileMainInfoForm';
import Button from '../../common/Button.vue';
import FormGroup from '../../common/form/FormGroup.vue';

@Component({
    components: {
      FormGroup,
      Button
    },
})
export default class ProfileMainFormComponent extends Vue {
    @Prop({ required: true }) readonly form!: ProfileMainInfoForm;
}
</script>

<style lang="scss" scoped>
.grid-conten {
    min-height: 32px;
}
.bg-purple {
    background: #d3dce6;
}
.main-info {
  .text-area {
    width: 100%;
    border: 1px solid #f2f2f2 !important;
  }
}

</style>
