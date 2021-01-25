<template>
  <v-row class="mt-3">
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <FormGroup
          :messages="form.messages.email"
          :server-errors="form.getErrors('email')"
          :validator="form.$v.email"
      >
        <template v-slot:label>
          <label for="email">Email</label>
        </template>
        <template v-slot:input="{attrs}">
          <input
              class="input input__normal"
              type="text" name="email"
              id="email"
              @input="form.$v.email.$touch()"
              v-model="form.email"
              v-bind="attrs"
          >
        </template>
      </FormGroup>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <FormGroup
          :messages="form.messages.username"
          :server-errors="form.getErrors('username')"
          :validator="form.$v.username"
      >
        <template v-slot:label>
          <label for="username">Телефон</label>
        </template>
        <template v-slot:input="{attrs}">
          <input
              class="input input__normal"
              type="text" name="username"
              id="username"
              :disabled="true"
              @input="form.$v.username.$touch()"
              v-model="form.username"
              v-bind="attrs"
          >
        </template>
      </FormGroup>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <FormGroup
          :messages="form.messages.skype"
          :server-errors="form.getErrors('skype')"
          :validator="form.$v.skype"
      >
        <template v-slot:label>
          <label for="skype">Логин в Skype</label>
        </template>
        <template v-slot:input>
          <input
              class="input input__normal"
              type="text" name="skype"
              id="skype"
              @input="form.$v.skype.$touch()"
              v-model="form.skype"
          >
        </template>
      </FormGroup>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <FormGroup
          :messages="form.messages.vk"
          :server-errors="form.getErrors('vk')"
          :validator="form.$v.vk"
      >
        <template v-slot:label>
          <label for="vk">Страница ВКонтакте</label>
        </template>
        <template v-slot:input="{attrs}">
          <input
              class="input input__normal"
              type="text" name="vk"
              id="vk"
              @input="form.$v.vk.$touch()"
              v-model="form.vk"
              v-bind="attrs"
          >
        </template>
      </FormGroup>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <FormGroup
          :messages="form.messages.instagram"
          :server-errors="form.getErrors('instagram')"
          :validator="form.$v.instagram"
      >
        <template v-slot:label>
          <label for="instagram">Страница Instagram</label>
        </template>
        <template v-slot:input="{attrs}">
          <input
              class="input input__normal"
              type="text" name="instagram"
              id="instagram"
              @input="form.$v.instagram.$touch()"
              v-model="form.instagram"
              v-bind="attrs"
          >
        </template>
      </FormGroup>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <FormGroup
          :messages="form.messages.facebook"
          :server-errors="form.getErrors('facebook')"
          :validator="form.$v.facebook"
      >
        <template v-slot:label>
          <label for="facebook">Страница Facebook</label>
        </template>
        <template v-slot:input="{attrs}">
          <input
              class="input input__normal"
              type="text" name="facebook"
              id="facebook"
              @input="form.$v.facebook.$touch()"
              v-model="form.facebook"
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ProfileContactDataForm} from '@/form/profile/contactData/ProfileContactDataForm';
import Button from '@/UI/components/common/Button.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';

@Component({
  components: {
    FormGroup,
    Button
  }
})
export default class ProfileContactData extends Vue {
  @Prop({ required: true }) readonly form!: ProfileContactDataForm;
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
