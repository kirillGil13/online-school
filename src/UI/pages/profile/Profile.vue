<template>
    <v-row class="profile">
        <v-col :cols="12">
            <h1>{{`${user.name} ${user.surname}`}}</h1>
        </v-col>
        <v-col :cols="12" class="profile__main-content">
            <v-row>
                <v-col :cols="windowSize.x > windowWideBreak ? 2 : 12">
                    <div
                        :class="{
                            'profile__info-full-size': windowSize.x > windowWideBreak,
                            'profile__info-low-size': windowSize.x < windowWideBreak,
                        }"
                    >
                        <avatar
                            :height="windowSize.x > windowWideBreak ? 143 : 70"
                            :imageSourse="'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg'"
                            :starSize="AvatarSizeEnum.MEDIUM"
                            :width="windowSize.x > windowWideBreak ? 143 : 70"
                        />
                        <Badge>
                            <template slot="title">Партнеров</template>
                            18
                        </Badge>
                        <v-btn @click="logOut" class="profile__singout-button">Выйти </v-btn>
                    </div>
                </v-col>
                <v-col :cols="windowSize.x > windowWideBreak ? 10 : 12">
                    <div class="grid-content profile__detail-info">
                        <v-row>
                            <v-col cols="12" class="profile__col">
                                <v-tabs v-model="activeName">
                                  <v-tab>
                                    Общие
                                  </v-tab>
                                  <v-tab>
                                    Контактные данные
                                  </v-tab>
                                  <v-tab>
                                    Безопасность
                                  </v-tab>
                                  <v-tab>
                                    Подписка
                                  </v-tab>
                                  <v-tab>
                                    Сменить аватар
                                  </v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="activeName">
                                    <v-tab-item>
                                        <profile-main-info :form="mainInfoForm" />
                                    </v-tab-item>
                                    <v-tab-item>
                                        <profile-contact-data />
                                    </v-tab-item>
                                    <v-tab-item>
                                        <profile-security />
                                    </v-tab-item>
                                    <v-tab-item>
                                        <profile-subscribe />
                                    </v-tab-item>
                                    <v-tab-item>
                                        <profile-avatar-change />
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Badge from '@/UI/components/common/Badge.vue';
import Avatar from '@/UI/components/common/Avatar.vue';
import Button from '@/UI/components/common/Button.vue';
import ProfileAvatarChange from '@/UI/components/profile/AvatarChange.vue';
import ProfileSubscribe from '@/UI/components/profile/Subscribe.vue';
import ProfileSecurity from '@/UI/components/profile/Security.vue';
import ProfileContactData from '@/UI/components/profile/ContactData.vue';
import ProfileMainInfo from '@/UI/components/profile/MainInfo.vue';
import { IFormGroup, RxFormBuilder } from '@rxweb/reactive-forms';
import { ProfileMainInfoForm } from '@/form/profile/profileMainInfoForm';
import { IWindowSize } from '@/entity/environment';
import { AvatarSizeEnum } from '@/entity/common/avatar.types';
import { AuthStore } from '@/store/modules/Auth';
import {IUser} from '@/entity/user';

@Component({
    components: {
        Badge,
        Avatar,
        Button,
        ProfileSecurity,
        ProfileMainInfo,
        ProfileContactData,
        ProfileSubscribe,
        ProfileAvatarChange,
    },
})
export default class Profile extends Vue {
    mainInfoForm!: IFormGroup<ProfileMainInfoForm>;
    formBuilder: RxFormBuilder = new RxFormBuilder();
    windowSize: IWindowSize = {
        x: 0,
        y: 0,
    };
    activeName = 0;
    AvatarSizeEnum = AvatarSizeEnum;

    get user(): IUser {
      return AuthStore.user;
    }

    constructor() {
        super();
        this.mainInfoForm = this.formBuilder.formGroup(
            new ProfileMainInfoForm(this.user)
        ) as IFormGroup<ProfileMainInfoForm>;
    }

    get windowWideBreak(): number {
        return 1575;
    }

    private onResize(): void {
        this.windowSize = {
            x: window.innerWidth,
            y: window.innerHeight,
        };
    }

    private logOut(): void {
      AuthStore.logout()
    }

    private mounted(): void {
        this.onResize();
        window.addEventListener('resize', this.onResize);
    }
}
</script>

<style lang="scss" scoped>
.profile {

    &__main-content {
        border-radius: $main_border_radius;
        background-color: $white;
        padding: 24px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }

    &__singout-button {
        background-color: rgba(66, 109, 246, 0.12);
        border-radius: $main_border_radius;
        color: $blue;
        width: 144px;
        max-height: 50px;
    }

    &__col {
        padding: 10px;
    }

    &__info-full-size {
        max-width: 144px;
        min-height: 600px;
    }

    &__info-low-size {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__detail-info {
        border-radius: $main_border_radius;
        border: 1px solid #e8edfe;
    }
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 600px;
    margin-bottom: 10px;
}

.grid-conten {
    min-height: 32px;
}
</style>