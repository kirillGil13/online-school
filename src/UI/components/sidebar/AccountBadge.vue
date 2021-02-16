<template>
    <div class="account-badge">
        <avatar
            :imageSource="userInfo.avatar"
            :imageClass="'account-badge__avatar'"
            :size="48"
            :starSize="AvatarSizeEnum.SMALL"
        />
        <div class="account-badge__account-info">
            <span class="user_name">{{ `${userInfo.name} ${userInfo.surname}` }}</span>
            <div class="account-badge__bottom">
                <div class="account-badge__login-wrapper">
                    <span class="account-badge__login">{{
                        userId
                    }}</span>
                </div>
                <svg-icon v-clipboard="userId" class="account-badge__copy-icon" name="Copy" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IFakeUserInfo } from '@/entity/environment';
import Avatar from '@/UI/components/common/Avatar.vue';
import { AvatarSizeEnum } from '@/entity/common/avatar.types';
@Component({
    components: {
        Avatar,
    },
})
export default class AccountBadge extends Vue {
    @Prop({ required: true }) readonly userInfo!: IFakeUserInfo;
    @Prop({required: true}) userId!: number;
    AvatarSizeEnum = AvatarSizeEnum;
}
</script>

<style scoped lang="scss">
.account-badge {
    min-width: 80%;
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
          font-weight: bold;
          margin-bottom: 5px;
          width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
        justify-content: center;
        align-items: center;
    }
    &__copy-icon {
        margin-left: 10px;
        color: $blue;
        height: 100% !important;
        width: 16px !important;
        cursor: pointer;
    }
}
</style>
