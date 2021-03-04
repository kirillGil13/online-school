<template>
  <v-row class="profile">
    <v-col :cols="12">
      <Header class="mb-3" :title="`${user.name} ${user.lastName}`"></Header>
    </v-col>
    <v-col :cols="12">
      <div class="profile__main-content">
        <v-row>
          <v-col class="pt-0" :cols="isMobile ? 12 : 2">
            <div
                :class="{
                            'profile__info-full-size': !isMobile,
                            'profile__info-low-size': isMobile,
                        }"
            >
              <div :class="[isMobile ? 'avatar_mobile_container' : '']">
                <avatar
                    :size="isMobile ? 73 : 143"
                    :imageSource="user.photoLink"
                    :starSize="AvatarSizeEnum.MEDIUM"
                    :avatar-size="AvatarSizeEnum.MEDIUM"
                    :picture-changed="pictureChanged"
                >
                  <template v-slot:inputFile>
                    <input class="input-file" type="file" accept="image/*" id="upload" @change="pickPhoto($event)">
                  </template>
                </avatar>
                <div :class="['badges', isMobile ? 'd-flex flex-row mobile' : '']">
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
              </div>
              <Button @submit="logOut" class="btn secondary_blue py-3 mt-2">Выйти</Button>
            </div>
          </v-col>
          <v-col class="profile__detail-info-container pa-6" :cols="isMobile ? 12 : 10">
            <div class="grid-content">
              <v-row>
                <v-col cols="12" class="profile__col">
                  <v-tabs show-arrows class="mb-2" color="#426DF6" v-model="activeName">
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
                        <profile-main-info :form="mainInfoForm"/>
                      </keep-alive>
                    </v-tab-item>
                    <v-tab-item>
                      <keep-alive>
                        <profile-contact-data :form="contactDataForm"/>
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
import {Component, Vue, Watch} from 'vue-property-decorator';
import Badge from '@/UI/components/common/Badge.vue';
import Avatar from '@/UI/components/common/Avatar.vue';
import Button from '@/UI/components/common/Button.vue';
import ProfileAvatarChange from '@/UI/components/profile/AvatarChange.vue';
import ProfileSubscribe from '@/UI/components/profile/Subscribe.vue';
import ProfileSecurity from '@/UI/components/profile/Security.vue';
import ProfileContactData from '@/UI/components/profile/ContactData.vue';
import ProfileMainInfo from '@/UI/components/profile/MainInfo.vue';
import {AvatarSizeEnum} from '@/entity/common/avatar.types';
import {AuthStore} from '@/store/modules/Auth';
import {IUser} from '@/entity/user';
import Header from '@/UI/components/common/Header.vue';
import {ProfileMainInfoForm} from '@/form/profile/mainInfo/ProfileMainInfoForm';
import {ProfileContactDataForm} from '@/form/profile/contactData/ProfileContactDataForm';
import ProfileEditForm from '@/form/profile/profileEditForm';
import Alert from '@/UI/components/common/Alert.vue';
import {AdaptiveStore} from '@/store/modules/Adaptive';
import {ProfilePictureStore} from '../../../store/modules/ProfilePicture';
import {IProfilePicture} from '../../../entity/common/profilePicture.types';
import {UserUpdateStore} from '../../../store/modules/UserUpdate';

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
  pictureChanged = false;
  show = false;
  success = false;
  activeName = 0;
  AvatarSizeEnum = AvatarSizeEnum;

  @Watch('user.photoLink')
  onPhotoChanged(): void {
    this.pictureChanged = false;
  }

  get user(): IUser {
    return AuthStore.user;
  }

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }

  constructor() {
    super();
    this.mainInfoForm = new ProfileMainInfoForm();
    this.mainInfoForm.setFormData(this.user);
    this.contactDataForm = new ProfileContactDataForm();
    this.contactDataForm.setFormData(this.user);

  }

  changeAlert(show: boolean, success: boolean): void {
    this.show = show;
    this.success = success;
  }

  private logOut(): void {
    AuthStore.logout()
  }

  // todo
  // private submit(): void {
  //   this.editForm = new ProfileEditForm(this.mainInfoForm.getFormData(), this.contactDataForm.getFormData());
  //   const resp = UserUpdateStore.updateUser(this.editForm.getFullRequest());
  //   if (resp) {
  //     this.changeAlert(true, true);
  //   } else this.changeAlert(true, false);
  // }

  async pickPhoto(e: any): Promise<void> {
    this.pictureChanged = true;
    const selectedImage = e.target.files[0];
    await ProfilePictureStore.set({file: selectedImage});
    if (this.pictureLoaded) {
      if (await UserUpdateStore.updateUser({shortPhotoLink: this.picture!.shortLink})) {
        await AuthStore.fetch();
      }
    }
  }

  get picture(): IProfilePicture | null {
    return ProfilePictureStore.profilePicture;
  }

  get pictureLoaded(): boolean {
    return ProfilePictureStore.profilePictureLoaded;
  }


}
</script>

<style lang="scss">
.profile {
  label {
    border: none !important;
  }
  .avatar_mobile_container {
    width: 100%;
  }
  .badges {
    margin-top: 24px;
    &.mobile {
      width: 100%;
      .badge {
        &:nth-last-child(1) {
          margin-bottom: 8px;
        }
      }
    }
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
    justify-content: center;
    flex-direction: column;
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
</style>
