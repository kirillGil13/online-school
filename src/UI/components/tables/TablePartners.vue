<template>
    <el-col class="table">
        <div class="tr">
            <el-col>Имя</el-col>
            <el-col>Номер телефона</el-col>
            <el-col>Партнеров</el-col>
            <el-col>Подписка</el-col>
            <el-col>Инфопакет</el-col>
            <el-col>Дата регистрации</el-col>
        </div>
        <div class="tr tbody" v-for="(partner, index) in partners" :key="index">
            <el-col
                ><div class="avatar" :style="{ backgroundImage: 'url(' + partner.avatar + ')' }"></div>
                {{ partner.name }}</el-col
            >
            <el-col>{{ partner.phone }}</el-col>
            <el-col>23</el-col>
            <el-col>Оформлена</el-col>
            <el-col>{{ candidate.createdAt }}</el-col>
            <el-col>{{ partner.infoPackageTitle }}</el-col>
            <el-col>{{ partner.startPartnerDate }}</el-col>
        </div>
    </el-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '@/UI/components/common/Button.vue';
import PartnersItem from '@/entity/partners/partners';

@Component({
    components: {
        Button,
    },
})
export default class TablePartners extends Vue {
    @Prop() readonly partners!: PartnersItem[];
}
</script>

<style lang="scss">
.table {
    .tr {
        grid-template-columns: 25% 15% 15% 15% 15% 15%;
    }
    .avatar {
        width: 36px;
        height: 36px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        box-sizing: border-box;
        border-radius: 12px;
    }
}
</style>
