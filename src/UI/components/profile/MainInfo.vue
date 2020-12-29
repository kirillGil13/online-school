<template>
    <v-row>
        <v-col class="profile__col" cols="12">
            <input-wrapper>
                <v-text-field
                    @blur="form.controls.name.markAsDirty()"
                    v-model="form.props.name"
                    title="Имя"
                ></v-text-field>
                <template slot="title">
                    <span>Имя</span>
                </template>
                <template slot="error">
                    <span>{{ form.controls.name.errorMessage }}</span>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col" cols="12">
            <input-wrapper>
                <v-text-field
                    @blur="form.controls.surname.markAsDirty()"
                    v-model="form.props.surname"
                    title="Фамилия"
                ></v-text-field>
                <template slot="title">
                    <span>Фамилия</span>
                </template>
                <template slot="error">
                    <span>{{ form.controls.surname.errorMessage }}</span>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col" cols="12">
            <input-wrapper>
                <v-text-field
                    :value="form.baseObject.id"
                    disabled
                    title="OneLinks ID"
                ></v-text-field>
                <template slot="title">
                    <span>OneLinks ID</span>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col" cols="12">
            <input-wrapper>
                <v-text-field
                    :value="form.baseObject.referLink"
                    disabled
                    title="Партнерская ссылка на OneLinks"
                ></v-text-field>
                <template slot="title">
                    <span>Партнерская ссылка на OneLinks</span>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col" cols="12">
            <input-wrapper>
                <v-text-field
                    @blur="form.controls.description.markAsDirty()"
                    v-model="form.props.description"
                    title="Обо мне"
                ></v-text-field>
                <template slot="title">
                    <span>Обо мне</span>
                </template>
                <template slot="error">
                    <span>{{ form.controls.description.errorMessage }}</span>
                </template>
            </input-wrapper>
        </v-col>
        <v-col class="profile__col" cols="12">
            <Button :disabled="!form.valid" v-on="$listeners">Сохранить</Button>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IFormGroup } from '@rxweb/reactive-forms';
import { ProfileMainInfoForm } from '@/form/profile/profileMainInfoForm';
import InputWrapper from '@/UI/components/common/InputWrapper.vue';

@Component({
    components: {
        InputWrapper,
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
