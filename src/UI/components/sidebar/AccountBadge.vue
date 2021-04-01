<template>
  <div class="account-badge" @click="$emit('proceed')">
    <avatar
        :imageSource="userInfo.photoLink"
        :imageClass="'account-badge__avatar'"
        :size="48"
        class="badge-avatar"
        :starSize="AvatarSizeEnum.SMALL"
    />
    <div class="account-badge__account-info">
      <span class="user_name">{{ `${userInfo.name} ${userInfo.lastName}` }}</span>
    </div>
    <div class="proceed d-flex justify-end">
      <svg-icon name="Arrow_Down"></svg-icon>
    </div>
    <Alert :show="show" :type="alertType.Success" text="Скопировано в буфер обмена" @show="showAlert"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IFakeUserInfo} from '@/entity/environment';
import Avatar from '@/UI/components/common/Avatar.vue';
import {AvatarSizeEnum} from '@/entity/common/avatar.types';
import Alert from '../common/Alert.vue';
import {AlertTypeEnum} from '../../../entity/common/alert.types';

@Component({
  components: {
    Alert,
    Avatar,
  },
})
export default class AccountBadge extends Vue {
  @Prop({required: true}) readonly userInfo!: IFakeUserInfo;
  @Prop({required: true}) userId!: number;
  AvatarSizeEnum = AvatarSizeEnum;
  show = false;
  alertType = AlertTypeEnum;

  showAlert(show: boolean): void {
    this.show = show;
  }

  copied(): void {
    this.show = true;
  }
}
</script>

<style scoped lang="scss">
.account-badge {
  min-width: 80%;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  border: 1px solid #f2f2f2;
  width: 100%;
  border-radius: $main_border_radius;

  &__account-info {
    width: 100%;
    margin-left: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;

    .user_name {
      width: 100%;
      max-width: 116px;
      font-weight: bold;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 5px;
    }
  }

  &__login-wrapper {
    font-size: 11px;
    line-height: 15px;
    font-family: 'Manrope-Regular';
    font-weight: 600;
    letter-spacing: 1px;
    color: $blue;
    background-color: #e8edfe;
    padding: 5px;
    border-radius: 6px;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__copy-icon {
    margin-left: 10px;
    color: $blue;
    height: 100% !important;
    width: 16px !important;
    cursor: pointer;
  }

  .proceed {
    min-width: 45px;
    cursor: pointer;

    .svg-icon {
      width: 16px !important;
      height: 16px !important;
      transform: rotate(-90deg);
    }
  }
}
</style>
