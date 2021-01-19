<template>
    <v-row class="mt-3">
        <v-col class="profile__col pt-0 pb-4" cols="12">
          <FormGroup
              :messages="form.messages.name"
              :server-errors="form.getErrors('name')"
              :validator="form.$v.name"
          >
            <template v-slot:label>
              <label for="name">Имя</label>
            </template>
            <template v-slot:input="{attrs}">
              <input
                  class="input input__normal"
                  type="text" name="name"
                  id="name"
                  @input="form.$v.name.$touch()"
                  v-model="form.name"
                  v-bind="attrs"
              >
            </template>
          </FormGroup>
        </v-col>
        <v-col class="profile__col pt-0 pb-4" cols="12">
          <FormGroup
              :messages="form.messages.surname"
              :server-errors="form.getErrors('surname')"
              :validator="form.$v.surname"
          >
            <template v-slot:label>
              <label for="surname">Фамилия</label>
            </template>
            <template v-slot:input="{attrs}">
              <input
                  class="input input__normal"
                  type="text" name="surname"
                  id="surname"
                  @input="form.$v.surname.$touch()"
                  v-model="form.surname"
                  v-bind="attrs"
              >
            </template>
          </FormGroup>
        </v-col>
        <v-col class="profile__col pt-0 pb-4" cols="12">
          <FormGroup
          >
            <template v-slot:label>
              <label for="name">OneLinks ID</label>
            </template>
            <template v-slot:input>
              <input
                  class="input input__normal"
                  type="text" name="id"
                  id="id"
                  :disabled="true"
                  @input="form.$v.id.$touch()"
                  v-model="form.id"
              >
            </template>
          </FormGroup>
        </v-col>
        <v-col class="profile__col pt-0 pb-4" cols="12">
          <FormGroup
              :messages="form.messages.description"
              :server-errors="form.getErrors('description')"
              :validator="form.$v.description"
          >
            <template v-slot:label>
              <label for="description">Обо мне</label>
            </template>
            <template v-slot:input="{attrs}">
              <input
                  class="input input__normal"
                  type="text" name="description"
                  id="description"
                  @input="form.$v.description.$touch()"
                  v-model="form.description"
                  v-bind="attrs"
              >
            </template>
          </FormGroup>
        </v-col>
        <v-col class="profile__col pt-0 pb-3" cols="12">
            <Button class="py-3" :disabled="form.$v.$invalid" v-on="$listeners">Сохранить</Button>
        </v-col>
    </v-row>
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
