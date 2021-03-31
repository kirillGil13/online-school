<template>
    <v-col class="mt-3 pa-0">
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
        <div class="mb-3">
          <FormGroup v-slot="attrs" :form="form" field="description" show-custom-error label="Обо мне">
            <input
                class="input input__normal"
                type="text" name="description"
                id="description"
                v-model="form[attrs.name]"
                v-bind="attrs"
                @input="attrs.change"
            >
          </FormGroup>
        </div>
        <div>
          <Button class="form-button" :disabled="form.disabled" v-on="$listeners">Сохранить
          </Button>
        </div>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProfileMainInfoForm } from '@/form/profile/mainInfo/ProfileMainInfoForm';
import Button from '@/UI/components/common/Button.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';

@Component({
    components: {
      FormGroup,
      Button
    },
})
export default class ProfileMainInfo extends Vue {
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
</style>
