<template>
    <div class="table">
        <div class="tr">
            <div>Имя</div>
            <div>Номер телефона</div>
            <div>Партнеров</div>
            <div>Подписка</div>
            <div>Инфопакет</div>
            <div>Дата регистрации</div>
        </div>
        <div class="tr tbody" v-for="(partner, index) in partners" :key="index">
            <div class="info-container">
              <div class="avatar" :style="{ backgroundImage: 'url(' + partner.avatar + ')' }"></div>
                {{ partner.name }}</div
            >
            <div class="link">{{ partner.phone }}</div>
            <div>{{ partner.totalPartners }}</div>
            <div :class="subscribeClass(partner)">{{partner.subscribe ? 'Оформлена' : 'Не оформлена'}}</div>
            <div>{{ partner.infoPackageTitle }}</div>
            <div>{{ partner.startPartnerDate | moment('DD.MM, HH:mm') }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '@/UI/components/common/Button.vue';
import { IPartner } from '@/entity/partners';

@Component({
    components: {
        Button,
    },
})
export default class TablePartners extends Vue {
    @Prop() readonly partners!: IPartner[];
    private subscribeClass(object: IPartner): string {
      return object.subscribe ? 'subscribe-success': 'subscribe-error'
    }
}
</script>

<style lang="scss" scoped>
.table {
    .tr {
        grid-template-columns: 25% 15% 15% 15% 15% 15%;
    }
    .avatar {
        width: 36px;
        height: 36px;
        margin-right: 10px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        box-sizing: border-box;
        border-radius: 12px;
    }
    .info-container{
      display: flex;
      align-items: center;
    }
  .subscribe{
    &-success{
      color: $green;
    }
    &-error {
      color: red;
    }
  }
}
</style>
