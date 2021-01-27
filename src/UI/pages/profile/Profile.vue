<template>
  <v-row class="profile">
    <v-col :cols="12">
      <Header class="mb-3" :title="`${user.name} ${user.surname}`"></Header>
    </v-col>
    <v-col :cols="12">
      <div class="profile__main-content">
        <v-row>
          <v-col class="pt-0" :cols="windowSize.x > windowWideBreak ? 2 : 12">
            <div
                :class="{
                            'profile__info-full-size': windowSize.x > windowWideBreak,
                            'profile__info-low-size': windowSize.x < windowWideBreak,
                        }"
            >
              <avatar
                  :size="windowSize.x > windowWideBreak ? 143 : 70"
                  :imageSourse="'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg'"
                  :starSize="AvatarSizeEnum.MEDIUM"
              />
              <div class="badges">
                <Badge :subs="user.activeSubscription">
                  <template v-slot:title>Подписка</template>
                  <template v-if="user.activeSubscription" v-slot:sub>Оформлена</template>
                  <template v-else v-slot:sub>Не оформлена</template>
                </Badge>
                <Badge>
                  <template v-slot:title>Партнеров</template>
                  <template v-slot:default>18</template>
                </Badge>
                <Badge>
                  <template v-slot:title>Переходов</template>
                  <template v-slot:default>291</template>
                </Badge>
              </div>

              <Button @click="logOut" class="btn secondary_blue py-3 mt-2">Выйти</Button>
            </div>
          </v-col>
          <v-col class="profile__detail-info-container pa-6" :cols="windowSize.x > windowWideBreak ? 10 : 12">
            <div class="grid-content">
              <v-row>
                <v-col cols="12" class="profile__col">
                  <v-tabs show-arrows class="mb-2" color="#426DF6"  v-model="activeName">
                    <v-tabs-slider color="#426DF6"></v-tabs-slider>
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
                    <v-divider></v-divider>
                    <v-tab-item>
                      <keep-alive>
                        <profile-main-info @submit="submit()" :form="mainInfoForm"/>
                      </keep-alive>
                    </v-tab-item>
                    <v-tab-item>
                      <keep-alive>
                        <profile-contact-data @submit="submit()" :form="contactDataForm"/>
                      </keep-alive>
                    </v-tab-item>
                    <v-tab-item>
                      <profile-security/>
                    </v-tab-item>
                    <v-tab-item>
                      <profile-subscribe/>
                    </v-tab-item>
                    <v-tab-item>
                      <profile-avatar-change/>
                    </v-tab-item>
                  </v-tabs-items>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <Alert :success="success" :show="show" @change="changeAlert"/>
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
import { IWindowSize } from '@/entity/environment';
import { AvatarSizeEnum } from '@/entity/common/avatar.types';
import { AuthStore } from '@/store/modules/Auth';
import { IUser } from '@/entity/user';
import Header from '@/UI/components/common/Header.vue';
import { UserUpdateStore } from '@/store/modules/UserUpdate';
import { ProfileMainInfoForm } from '@/form/profile/mainInfo/ProfileMainInfoForm';
import { ProfileContactDataForm } from '@/form/profile/contactData/ProfileContactDataForm';
import ProfileEditForm from '@/form/profile/profileEditForm';
import Alert from '@/UI/components/common/Alert.vue';

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
    Header,
    Alert,
  },
})
export default class Profile extends Vue {
  mainInfoForm!: ProfileMainInfoForm;
  contactDataForm: ProfileContactDataForm;
  editForm!: ProfileEditForm;
  show = false;
  success = false;
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
    this.mainInfoForm = new ProfileMainInfoForm();
    this.mainInfoForm.setFormData(this.user);
    this.contactDataForm = new ProfileContactDataForm();
    this.contactDataForm.setFormData(this.user);

  }

  get windowWideBreak(): number {
    return 1400;
  }

  private onResize(): void {
    this.windowSize = {
      x: window.innerWidth,
      y: window.innerHeight,
    };
  }

  changeAlert(show: boolean, success: boolean): void {
    this.show = show;
    this.success = success;
  }

  private logOut(): void {
    AuthStore.logout()
  }

  private mounted(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  private submit(): void {
    this.editForm = new ProfileEditForm(this.mainInfoForm.getFormData(), this.contactDataForm.getFormData());
    const resp = UserUpdateStore.updateUser(this.editForm.getFullRequest());
    if (resp) {
      this.changeAlert(true, true);
    } else this.changeAlert(true, false);
  }

}
</script>

<style lang="scss" scoped>
.profile {
  .badges {
    margin-top: 24px;
  }

  &__main-content {
    border-radius: $main_border_radius;
    background-color: $white;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .btn {
    font-size: 12px;
    width: 100%;
  }
  &__singout-button {
    background-color: rgba(66, 109, 246, 0.12) !important;
    border-radius: $main_border_radius;
    color: $blue;
    width: 144px;
    max-height: 50px;
  }

  &__col {
    padding: 10px;
    .v-tab {
      font-size: 14px !important;
      text-transform: none !important;
      letter-spacing: normal !important;
    }

  }

  &__info-full-size {
    width: 144px;
  }

  &__info-low-size {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__detail-info-container {
    border: 1px solid rgba(66, 109, 246, 0.12);
    border-radius: $main_border_radius;
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
}

.grid-conten {
  min-height: 32px;
}
label {
  border: none !important;
}
.input {
  padding: 12px 16px 12px 16px;
  border-style: solid;
  border-radius: 5px 0 0 5px;

  &__normal {
    border-radius: 5px;
  }
}
</style>
