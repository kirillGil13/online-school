<template>
    <div class="account-badge">
        <avatar
            :imageSourse="userInfo.avatar"
            :imageClass="'account-badge__avatar'"
            :height="48"
            :width="48"
            :star="true"
        />
        <div class="account-badge__account-info">
            <span>{{ `${userInfo.name} ${userInfo.surname}` }}</span>
            <div class="account-badge__bottom">
                <div class="account-badge__login-wrapper">
                    <span class="account-badge__login">{{
                        userInfo.login
                    }}</span>
                </div>
                <svg-icon class="account-badge__copy-icon" name="Copy" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IFakeUserInfo } from '@/entity/environment';
import Avatar from './Avatar.vue';
@Component({
    components: {
        Avatar
    }
})
export default class AccountBadge extends Vue {
    @Prop({ required: true }) readonly userInfo!: IFakeUserInfo;
}
</script>

<style scoped lang="scss">
.account-badge {
    max-width: 80%;
    padding: 20px;
    display: flex;
    align-items: center;
    border: 1px solid #f2f2f2;
    width: 100%;
    border-radius: 12px;
    &__account-info {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__login-wrapper {
        color: #426df6;
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
        color: #426df6;
        height: 100% !important;
        width: 20px !important;
    }
}
</style>
