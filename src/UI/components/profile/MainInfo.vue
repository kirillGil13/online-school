<template>
    <v-row class="mt-3">
        <v-col class="profile__col pt-0 pb-4" cols="12">
            <input-wrapper>
              <input
                  class="input input__normal"
                  @blur="form.controls.name.markAsDirty()"
                  type="text" name="name"
                  id="name"
                  v-model="form.props.name"
              >
                <template v-slot:title>
                    <label for="name">Имя</label>
                </template>
                <template v-slot:error>
                    <span>{{ form.controls.name.errorMessage }}</span>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col pt-0 pb-4" cols="12">
            <input-wrapper>
              <input
                  class="input input__normal"
                  @blur="form.controls.surname.markAsDirty()"
                  type="text" name="surname"
                  id="surname"
                  v-model="form.props.surname"
              >
                <template v-slot:title>
                    <label for="surname">Фамилия</label>
                </template>
                <template v-slot:error>
                    <span>{{ form.controls.surname.errorMessage }}</span>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col pt-0 pb-4" cols="12">
            <input-wrapper>
              <input
                  class="input input__normal"
                  :value="form.baseObject.id"
                  type="text" name="id"
                  :disabled="true"
                  id="id"
              >
                <template v-slot:title>
                    <label for="id">OneLinks ID</label>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col pt-0 pb-4" cols="12">
            <input-wrapper>
              <input
                  class="input input__normal"
                  @blur="form.controls.description.markAsDirty()"
                  type="text" name="desc"
                  id="desc"
                  v-model="form.props.description"
              >
                <template v-slot:title>
                    <label for="desc">Обо мне</label>
                </template>
                <template v-slot:error>
                    <span>{{ form.controls.description.errorMessage }}</span>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col pt-0 pb-3" cols="12">
            <Button class="py-3" :disabled="!form.valid" v-on="$listeners">Сохранить</Button>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IFormGroup } from '@rxweb/reactive-forms';
import { ProfileMainInfoForm } from '@/form/profile/mainInfo/profileMainInfoForm';
import InputWrapper from '@/UI/components/common/InputWrapper.vue';
import Button from '@/UI/components/common/Button.vue';

@Component({
    components: {
        InputWrapper,
        Button
    },
})
export default class ProfileMainInfo extends Vue {
    @Prop({ required: true }) readonly form!: IFormGroup<ProfileMainInfoForm>;
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
