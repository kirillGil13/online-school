<template>
    <el-row>
        <el-col class="profile__col" :span="24">
            <div class="grid-conten bg-purple"></div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class ProfileMainInfo extends Vue {}
</script>

<style lang="scss" scoped>
.grid-conten {
    min-height: 32px;
}
.bg-purple {
    background: #d3dce6;
}
</style>
