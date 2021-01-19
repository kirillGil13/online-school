<template>
  <v-row class="mt-3">
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <input-wrapper>
        <input
            class="input input__normal"
            @blur="form.controls.email.markAsDirty()"
            type="text" name="email"
            id="email"
            v-model="form.props.email"
        >
        <template v-slot:title>
          <label for="email">Email</label>
        </template>
        <template v-slot:error>
          <span>{{ form.controls.email.errorMessage  }}</span>
        </template>
      </input-wrapper>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <input-wrapper>
        <input
            class="input input__normal"
            @blur="form.controls.username.markAsDirty()"
            type="text" name="username"
            id="username"
            v-model="form.props.username"
        >
        <template v-slot:title>
          <label for="username">Телефон</label>
        </template>
        <template v-slot:error>
          <span>{{ form.controls.username.errorMessage }}</span>
        </template>
      </input-wrapper>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <input-wrapper>
        <input
            class="input input__normal"
            type="text" name="skype"
            @blur="form.controls.skype.markAsDirty()"
            id="skype"
            v-model="form.props.skype"
        >
        <template v-slot:title>
          <label for="skype">Логин в Skype</label>
        </template>
        <template v-slot:error>
          <span>{{ form.controls.skype.errorMessage }}</span>
        </template>
      </input-wrapper>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <input-wrapper>
        <input
            class="input input__normal"
            @blur="form.controls.vk.markAsDirty()"
            type="text" name="vk"
            id="vk"
            v-model="form.props.vk"
        >
        <template v-slot:title>
          <label for="vk">Страница ВКонтакте</label>
        </template>
        <template v-slot:error>
          <span>{{ form.controls.vk.errorMessage }}</span>
        </template>
      </input-wrapper>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <input-wrapper>
        <input
            class="input input__normal"
            type="text" name="instagram"
            @blur="form.controls.instagram.markAsDirty()"
            id="instagram"
            v-model="form.props.instagram"
        >
        <template v-slot:title>
          <label for="instagram">Страница Instagram</label>
        </template>
        <template v-slot:error>
          <span>{{ form.controls.instagram.errorMessage }}</span>
        </template>
      </input-wrapper>
    </v-col>
    <v-col class="profile__col pt-0 pb-4" cols="12">
      <input-wrapper>
        <input
            class="input input__normal"
            type="text" name="facebook"
            @blur="form.controls.facebook.markAsDirty()"
            id="facebook"
            v-model="form.props.facebook"
        >
        <template v-slot:title>
          <label for="facebook">Страница Facebook</label>
        </template>
        <template v-slot:error>
          <span>{{ form.controls.facebook.errorMessage }}</span>
        </template>
      </input-wrapper>
    </v-col>
    <v-col class="profile__col pt-0 pb-3" cols="12">
      <Button class="py-3" :disabled="!form.valid" v-on="$listeners">Сохранить</Button>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IFormGroup} from '@rxweb/reactive-forms';
import {ProfileContactDataForm} from '@/form/profile/contactData/profileContactDataForm';
import InputWrapper from '@/UI/components/common/InputWrapper.vue';
import Button from '@/UI/components/common/Button.vue';

@Component({
  components: {
    InputWrapper,
    Button
  }
})
export default class ProfileContactData extends Vue {
  @Prop({ required: true }) readonly form!: IFormGroup<ProfileContactDataForm>;
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
