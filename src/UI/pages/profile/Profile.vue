<template>
  <v-row class="profile" :class="[$adaptive.isMobile && 'px-3']">
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
              <div :class="[$adaptive.isMobile ? 'avatar_mobile_container d-flex flex-row' : '']">
                <avatar
                    :class="[$adaptive.isMobile && 'mr-3']"
                    :size="$adaptive.isMobile ? 73 : 143"
                    :imageSource="user.photoLink"
                    :id="user.id"
                    :starSize="AvatarSizeEnum.MEDIUM"
                    :avatar-size="AvatarSizeEnum.MEDIUM"
                    :picture-changed="pictureChanged"
                >
                  <template v-slot:inputFile>
                    <input class="input-file" type="file" accept="image/*" id="upload" @change="handleImage($event)">
                  </template>
                </avatar>
                <div v-if="$adaptive.isMobile" class="d-flex align-center font-weight-bold font-16">
                  {{ user.name }}<br>
                  {{ user.lastName }}
                </div>
              </div>
              <div v-if="user.isLeader && $adaptive.isMobile" @click="$router.push({name: $routeRules.Cabinet})" class="proceed d-flex justify-space-between align-center px-4 py-3 mt-3 full-width">
                <div class="d-flex"><svg-icon class="align-self-center mr-2" name="Star"></svg-icon>Кабинет лидера</div>
                <v-icon color="#4F79FF">mdi-chevron-right</v-icon>
              </div>
              <div v-if="$adaptive.isMobile" @click="$router.push({name: $routeRules.Chosen})" class="proceed d-flex justify-space-between align-center px-4 py-3 mt-3 full-width">
                <div class="d-flex"><svg-icon class="align-self-center mr-2" name="Chosen"></svg-icon>Избранное</div>
                <v-icon color="#4F79FF">mdi-chevron-right</v-icon>
              </div>
<!--              <Button @submit="unSub" full-width small class="py-3 mt-2">Отменить подписку</Button>-->
              <Button @submit="logOut" full-width small class="secondary_blue py-3 mt-2">Выйти</Button>
            </div>
          </v-col>
          <v-col class="profile__detail-info-container pa-6" :cols="$adaptive.isMobile ? 12 : 10">
            <div class="grid-content">
              <v-row>
                <v-col cols="12" class="profile__col">
                  <v-tabs show-arrows class="mb-2" color="#426DF6" v-model="activeName">
                    <v-tabs-slider color="#426DF6"></v-tabs-slider>
                    <v-tab :ripple="false" v-for="(item, index) in tabs" :key="index" :style="{borderRadius: '8px'}">{{ item.title }}</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="activeName">
                    <v-divider></v-divider>
                    <v-tab-item v-for="(item, index) in tabs" :key="index">
                      <keep-alive>
                        <component
                            :is="item.component"
                            :contactForm="contactDataForm"
                            :mainForm="mainInfoForm"
                            :changeEmailForm="changeEmailForm"
                            @saveMain="saveMain"
                            @saveContact="saveContact"
                            @changeEmail="changeEmail"
                            style="margin-right: 2px; margin-left: 2px;"
                        />
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
import ProfileContactData from '../../components/forms/profile/ProfileContactDataFormComponent.vue';
import ProfileMainInfo from '../../components/forms/profile/ProfileMainFormComponent.vue';
import {AvatarSizeEnum} from '@/entity/common/avatar.types';
import {AuthStore} from '@/store/modules/Auth';
import {IUser} from '@/entity/user';
import Header from '@/UI/components/common/Header.vue';
import {ProfileMainInfoForm} from '@/form/profile/mainInfo/ProfileMainInfoForm';
import {ProfileContactDataForm} from '@/form/profile/contactData/ProfileContactDataForm';
import {PictureUploadStore} from '../../../store/modules/PictureUpload';
import {IPictureUpload} from '../../../entity/common/pictureUpload.types';
import Modal from '../../components/common/Modal.vue';
import PictureCropper from '../../components/cropper/PictureCropper.vue';
import {UserUpdateStore} from '../../../store/modules/UserUpdate';
import {ITabs} from '../../../entity/tabs/tabs.types';
import {TabsStore} from '../../../store/modules/Tabs';
import ProfileMain from '@/UI/components/profile/sections/ProfileMain.vue';
import ProfileContact from '@/UI/components/profile/sections/ProfileContact.vue';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import {ChangeEmailForm} from '../../../form/changeEmail/changeEmail';
import {ChangeEmailStore} from '../../../store/modules/ChangeEmail';
import {SubscriptionStore} from '../../../store/modules/Subscription';
import {eventBus} from '../../../main';
import ProfileSubs from '../../components/profile/sections/ProfileSubs.vue';

@Component({
  components: {
    ProfileSubs,
    PictureCropper,
    Modal,
    Badge,
    Avatar,
    Button,
    ProfileMainInfo,
    ProfileContactData,
    ProfileAvatarChange,
    Header,
    ProfileMain,
    ProfileContact,
  },
})
export default class Profile extends Vue {
  mainInfoForm: ProfileMainInfoForm;
  contactDataForm: ProfileContactDataForm;
  changeEmailForm: ChangeEmailForm;
  pictureChanged = false;
  success = false;
  activeName = 0;
  AvatarSizeEnum = AvatarSizeEnum;
  image = '';
  activator = false;
  destroy = true;
  alertType = AlertTypeEnum;
  reader = new FileReader();

  constructor() {
    super();
    this.mainInfoForm = new ProfileMainInfoForm();
    this.mainInfoForm.setFormData(this.user!);
    this.contactDataForm = new ProfileContactDataForm();
    this.contactDataForm.setFormData(this.user!);
    this.changeEmailForm = new ChangeEmailForm();
    this.changeEmailForm.setFormData(this.user!.email);
  }

  @Watch('user.photoLink')
  onPhotoChanged(): void {
    this.pictureChanged = false;
  }

  @Watch('pictureLoaded')
  async onPictureLoaded(): Promise<void> {
    if (this.pictureLoaded) {
      if (await UserUpdateStore.updateUser({shortPhotoLink: this.picture!.shortLink})) {
        await AuthStore.fetch();
        PictureUploadStore.clear();
      }
    }
  }

  @Watch('activator')
  onActivatorChange(): void {
    if (!this.activator) {
      this.image = '';
      this.rerender();
    }
  }

  get picture(): IPictureUpload | null {
    return PictureUploadStore.pictureUpload;
  }

  get pictureLoaded(): boolean {
    return PictureUploadStore.pictureUploadLoaded;
  }

  get tabs(): ITabs[] {
    return TabsStore.profileTabs;
  }

  get user(): IUser | null {
    return AuthStore.user;
  }

  private logOut(): void {
    AuthStore.logout()
  }

  close(): void {
    this.activator = false;
  }

  activatorChange(act: boolean): void {
    this.activator = act;
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
    this.reader.onload = (e: any): void => {
      this.image = e.target.result;
    };
    this.reader.readAsDataURL(file);
  }

  created(): void {
    document.title = this.user!.fullName + ' - ' + 'ONELINKS';
  }

  async changeEmail(): Promise<void> {
    if (await this.changeEmailForm.submit(ChangeEmailStore.sendCode)) {
      eventBus.$emit('showAlert', {
        show: true,
        type: this.alertType.Success,
        text: 'Ссылка успешно отправлена'
      })
    }
  }

  async unSub(): Promise<void> {
    if (await SubscriptionStore.delete()) {
      window.location.reload();
    }
  }

  async setImage(data: any): Promise<void> {
    this.pictureChanged = true;
    const {canvas} = data.getResult();
    canvas.toBlob((blob: Blob): void => {
          PictureUploadStore.set({file: blob as any});
        }
    );
    this.activator = false;
  }

  async saveMain(): Promise<void> {
    if (await UserUpdateStore.updateUser({
      name: this.mainInfoForm.name,
      lastName: this.mainInfoForm.surname,
      description: this.mainInfoForm.description
    })) {
      eventBus.$emit('showAlert', {
        show: true,
        type: this.alertType.Success,
        text: 'Данные успешно изменены'
      })
      await AuthStore.fetch();
    }
  }

  async saveContact(): Promise<void> {
    if (await UserUpdateStore.updateUser({
      telegram: this.contactDataForm.telegram,
      // eslint-disable-next-line @typescript-eslint/camelcase
      vk_link: this.contactDataForm.vk,
      // eslint-disable-next-line @typescript-eslint/camelcase
      facebook_link: this.contactDataForm.facebook,
      // eslint-disable-next-line @typescript-eslint/camelcase
      instagram_link: this.contactDataForm.instagram,
      // eslint-disable-next-line @typescript-eslint/camelcase
      site_link: this.contactDataForm.siteLink
    })) {
      eventBus.$emit('showAlert', {
        show: true,
        type: this.alertType.Success,
        text: 'Данные успешно изменены'
      })
      await AuthStore.fetch();
    }
  }

}
</script>

<style lang="scss">
.profile {
  .proceed {
    border: 1px solid rgba(66, 109, 246, 0.12);
    border-radius: 12px;
    color: #4F79FF;
  }
  label {
    border: none !important;
  }

  .avatar_mobile_container {
    width: 100%;
  }

  &__main-content {
    border-radius: $main_border_radius;
    background-color: $white;
    padding: 24px;
    box-shadow: 0px 14px 12px rgb(0 0 0 / 1%);
    border: 1px solid #F2F2F2;
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
.v-tabs .v-tab--active:focus::before {
  border-radius: 8px;
}
.v-tab:before {
  border-radius: 8px;
}
</style>
