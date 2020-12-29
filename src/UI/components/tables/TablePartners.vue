<template>
    <v-col class="table">
        <div class="tr">
            <v-col>Имя</v-col>
            <v-col>Номер телефона</v-col>
            <v-col>Партнеров</v-col>
            <v-col>Подписка</v-col>
            <v-col>Инфопакет</v-col>
            <v-col>Дата регистрации</v-col>
        </div>
        <div class="tr tbody" v-for="(partner, index) in partners" :key="index">
            <v-col
                ><div class="avatar" :style="{ backgroundImage: 'url(' + partner.avatar + ')' }"></div>
                {{ partner.name }}</v-col
            >
            <v-col>{{ partner.phone }}</v-col>
            <v-col>23</v-col>
            <v-col>Оформлена</v-col>
            <v-col>{{ candidate.createdAt }}</v-col>
            <v-col>{{ partner.infoPackageTitle }}</v-col>
            <v-col>{{ partner.startPartnerDate }}</v-col>
        </div>
    </v-col>
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
