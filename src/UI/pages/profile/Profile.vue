<template>
  <v-row class="profile">
    <v-col :cols="12">
      <Header class="mb-3" :title="`${user.name} ${user.lastName}`"></Header>
    </v-col>
    <v-col :cols="12">
      <div class="profile__main-content">
        <v-row>
          <v-col class="pt-0" :cols="$adaptive.isMobile ? 12 : 2">
            <div
                :class="{
                            'profile__info-full-size': !$adaptive.isMobile,
                            'profile__info-low-size': $adaptive.isMobile,
                        }"
            >
              <div :class="[$adaptive.isMobile ? 'avatar_mobile_container' : '']">
                <avatar
                    :size="$adaptive.isMobile ? 73 : 143"
                    :imageSource="user.photoLink"
                    :starSize="AvatarSizeEnum.MEDIUM"
                    :avatar-size="AvatarSizeEnum.MEDIUM"
                    :picture-changed="pictureChanged"
                >
                  <template v-slot:inputFile>
                    <input class="input-file" type="file" accept="image/*" id="upload" @change="handleImage($event)">
                  </template>
                </avatar>
              </div>
              <Button @submit="logOut" class="btn secondary_blue py-3 mt-2">Выйти</Button>
            </div>
          </v-col>
          <v-col class="profile__detail-info-container pa-6" :cols="$adaptive.isMobile ? 12 : 10">
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
                  </v-tabs-items>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <Modal :activator="activator" @activatorChange="activatorChange">
      <template v-slot:content v-if="destroy">
        <PictureCropper :image="image" @close="close" @setImage="setImage"/>
      </template>
    </Modal>
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
import Alert from '@/UI/components/common/Alert.vue';
import {ProfilePictureStore} from '../../../store/modules/ProfilePicture';
import {IProfilePicture} from '../../../entity/common/profilePicture.types';
import Modal from '../../components/common/Modal.vue';
import PictureCropper from '../../components/cropper/PictureCropper.vue';
import {UserUpdateStore} from '../../../store/modules/UserUpdate';

@Component({
  components: {
    PictureCropper,
    Modal,
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
  pictureChanged = false;
  success = false;
  activeName = 0;
  AvatarSizeEnum = AvatarSizeEnum;
  image = '';
  activator = false;
  destroy = true;

  @Watch('user.photoLink')
  onPhotoChanged(): void {
    this.pictureChanged = false;
  }

  @Watch('pictureLoaded')
  async onPictureLoaded(): Promise<void> {
    if (this.pictureLoaded) {
      if (await UserUpdateStore.updateUser({shortPhotoLink: this.picture!.shortLink})) {
        await AuthStore.fetch();
        ProfilePictureStore.clear();
      }
    }
  }

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

  close(): void {
    this.activator = false;
  }

  activatorChange(act: boolean): void {
    this.activator = act;
    this.image = '';
    this.rerender();
  }

  rerender(): void {
    this.destroy = false;
    this.$nextTick(() => {
      this.destroy = true;
    });
  }

  handleImage(e: any): void {
    const file = e.target.files[0];
    if (file) {
      this.createBase64(file);
      this.activator = true;
    }
  }

  createBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any): void => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // b64toBlob(b64Data: string, contentType: string, sliceSize?: number): Blob {
  //   contentType = contentType || '';
  //   sliceSize = sliceSize || 512;
  //   const byteCharacters = atob(b64Data);
  //   const byteArrays = [];
  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     const slice = byteCharacters.slice(offset, offset + sliceSize);
  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }
  //   const blob = new Blob(byteArrays, {type: contentType});
  //   return blob;
  // }

  async setImage(data: any): Promise<void> {
    this.pictureChanged = true;
    const {canvas} = data.getResult();
    canvas.toBlob( (blob: Blob): void => {
          ProfilePictureStore.set({file: blob as any});
        }
    );
    this.activator = false;
  }

  get picture(): IProfilePicture | null {
    return ProfilePictureStore.profilePicture;
  }

  get pictureLoaded(): boolean {
    return ProfilePictureStore.profilePictureLoaded;
  }

  created(): void {
      document.title = this.user.fullName + ' - ' + 'OneLinks';
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
