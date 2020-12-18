<template>
    <el-row>
        <el-col class="profile__col" :span="24">
            <input-wrapper>
                <el-input
                    @blur="form.controls.name.markAsDirty()"
                    v-model="form.props.name"
                    title="Имя"
                ></el-input>
                <template slot="title">
                    <span>Имя</span>
                </template>
                <template slot="error">
                    <span>{{ form.controls.name.errorMessage }}</span>
                </template>
            </input-wrapper>
        </el-col>
        <el-col class="profile__col" :span="24">
            <input-wrapper>
                <el-input
                    @blur="form.controls.surname.markAsDirty()"
                    v-model="form.props.surname"
                    title="Фамилия"
                ></el-input>
                <template slot="title">
                    <span>Фамилия</span>
                </template>
                <template slot="error">
                    <span>{{ form.controls.surname.errorMessage }}</span>
                </template>
            </input-wrapper>
        </el-col>
        <el-col class="profile__col" :span="24">
            <input-wrapper>
                <el-input
                    :value="form.baseObject.oneLinksId"
                    disabled
                    title="OneLinks ID"
                ></el-input>
                <template slot="title">
                    <span>OneLinks ID</span>
                </template>
            </input-wrapper>
        </el-col>
        <el-col class="profile__col" :span="24">
            <input-wrapper>
                <el-input
                    :value="form.baseObject.referLink"
                    disabled
                    title="Партнерская ссылка на OneLinks"
                ></el-input>
                <template slot="title">
                    <span>Партнерская ссылка на OneLinks</span>
                </template>
            </input-wrapper>
        </el-col>
        <el-col class="profile__col" :span="24">
            <input-wrapper>
                <el-input
                    @blur="form.controls.bio.markAsDirty()"
                    v-model="form.props.bio"
                    title="Обо мне"
                ></el-input>
                <template slot="title">
                    <span>Обо мне</span>
                </template>
                <template slot="error">
                    <span>{{ form.controls.bio.errorMessage }}</span>
                </template>
            </input-wrapper>
        </el-col>
        <el-col class="profile__col" :span="24">
            <Button :disabled="!form.valid" v-on="$listeners">Сохранить</Button>
        </el-col>
    </el-row>
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
