<template>
    <div class="table">
        <div class="tr">
            <v-col>Имя</v-col>
            <v-col>Номер телефона</v-col>
            <v-col>Почта</v-col>
            <v-col>Видео</v-col>
            <v-col>Дата</v-col>
            <v-col>Партнер</v-col>
            <v-col></v-col>
        </div>
        <div class="tr tbody" v-for="(candidate, index) in candidates" :key="index">
            <v-col>{{ candidate.name }}</v-col>
            <v-col>{{ candidate.phone }}</v-col>
            <v-col>{{ candidate.email }}</v-col>
            <v-col>
                <div class="video">
                    <div class="title">Porttitor euismod.</div>
                    <div class="duration">12:08 - 22:12</div>
                </div>
            </v-col>
            <v-col>{{ candidate.createdAt | moment('DD.MM, HH:mm') }}</v-col>
            <v-col>
                <Button>Сделать партнером</Button>
            </v-col>
            <v-col>
                <svg-icon name="Calendar_Table"></svg-icon>
            </v-col>
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

<style lang="scss"></style>
