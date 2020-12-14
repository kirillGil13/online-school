<template>
    <el-row class="profile">
        <el-col :span="24">
            <h1>Денис денисов</h1>
        </el-col>
        <el-col :span="24" class="profile__main-content">
            <el-row>
                <el-col :span="3">
                    <div class="profile__info">
                        <avatar
                            :imageSourse="'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg'"
                            :mediumStar="true"
                            :height="143"
                            :width="143"
                        />
                        <Badge>
                            <template slot="title">dsfdswf</template>
                            dfdf
                        </Badge>
                        <el-button class="profile__singout-button"
                            >Выйти</el-button
                        >
                    </div>
                </el-col>
                <el-col :span="21"
                    ><div class="grid-content profile__detail-info">
                        <el-row>
                            <el-col class="profile__col" :span="24">
                                <el-tabs
                                    v-model="activeName"
                                    @tab-click="handleClick"
                                >
                                    <el-tab-pane label="Общие" name="common"
                                        ><profile-main-info
                                    /></el-tab-pane>
                                    <el-tab-pane
                                        label="Контактные данные"
                                        name="contactData"
                                        ><profile-contact-data
                                    /></el-tab-pane>
                                    <el-tab-pane
                                        label="Безопасность"
                                        name="security"
                                        ><profile-security
                                    /></el-tab-pane>
                                    <el-tab-pane
                                        label="Подписка"
                                        name="subscribe"
                                        ><profile-subscribe
                                    /></el-tab-pane>
                                    <el-tab-pane
                                        label="Сменить аватар"
                                        name="changeAvatar"
                                        ><profile-avatar-change
                                    /></el-tab-pane>
                                </el-tabs>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
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
    private activeName = 'common';
    private handleClick(tab, event): void {
        console.log(tab, event);
    }
}
</script>

<style lang="scss" scoped>
.profile {
    width: 100%;
    height: 100%;
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
        width: 100%;
    }
    &__col {
        padding: 10px;
    }
    &__info {
        max-width: 144px;
        min-height: 600px;
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
