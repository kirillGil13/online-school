<template>
    <div class="table">
        <div class="tr">
            <div>Имя</div>
            <div>Номер телефона</div>
            <div>Почта</div>
            <div class="video-container">Видео</div>
            <div>Дата</div>
            <div>Партнер</div>
            <div></div>
        </div>
        <div class="tr tbody" v-for="(candidate, index) in candidates" :key="index">
            <div>{{ candidate.name }}</div>
            <div class="link">{{ candidate.phone }}</div>
            <div class="email link">{{ candidate.email }}</div>
            <div class="video-container">
                <div class="video">
                    <div class="title">Porttitor euismod.</div>
                    <div class="duration">12:08 - 22:12</div>
                </div>
            </div>
            <div>{{ candidate.createdAt | moment('DD.MM, HH:mm') }}</div>
            <div>
                <Button>Сделать партнером</Button>
            </div>
            <div>
                <svg-icon name="Calendar_Table"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Button from '@/UI/components/common/Button.vue';
import { Candidate } from '@/entity/candidates';

@Component({
    components: {
        Button,
    },
})
export default class TablePartners extends Vue {
    @Prop() readonly candidates!: Candidate[];
}
</script>

<style lang="scss" scoped>
.email {
  line-height: 80%;
}
.video-container{
  width: 70%;
  margin-left: 10%;
}
</style>
