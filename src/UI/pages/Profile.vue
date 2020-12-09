<template>
    <el-row class="profile">
        <el-col :span="24">
            <h1>Денис денисов</h1>
        </el-col>
        <el-col :span="24" class="profile__main-content">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content">
                        <avatar
                            :imageSourse="
                                'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg'
                            "
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
                <el-col :span="20"
                    ><div class="grid-content bg-purple-dark">
                        <el-row>
                            <el-col class="collol" :span="24">
                                <div class="grid-conten bg-purple"></div>
                            </el-col>
                            <el-col class="collol" :span="24">
                                <div class="grid-conten bg-purple"></div>
                            </el-col>
                            <el-col class="collol" :span="24">
                                <div class="grid-conten bg-purple"></div>
                            </el-col>
                            <el-col class="collol" :span="24">
                                <div class="grid-conten bg-purple"></div>
                            </el-col>
                            <el-col class="collol" :span="24">
                                <div class="grid-conten bg-purple"></div>
                            </el-col>
                            <el-col class="collol" :span="24">
                                <div class="grid-conten bg-purple"></div>
                            </el-col>
                            <el-col class="collol" :span="24">
                                <div class="grid-conten bg-purple"></div>
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
@Component({
    components: {
        Badge,
        Avatar,
        Button,
    },
})
export default class Profile extends Vue {}
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
    }
}

.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
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
.collol {
    padding: 10px;
}
</style>
