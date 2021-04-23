<template>
<v-sheet max-width="370" color="transparent" elevation="0" class="subscription d-flex flex-column justify-center align-center" @click="$emit('show')">
  <v-img v-if="!$adaptive.isMobile" :max-width="banner ? 251 : 311" :src="banner ? require('../../assets/course-subscribe-2.png') : require('../../assets/course-subscribe.png')"></v-img>
  <v-img v-else :max-width="211" :src="banner ? require('../../assets/course-subscribe-2.png') : require('../../assets/course-subscribe.png')"></v-img>
  <div class="font-weight-bold font-16 mt-6 text-center">Подписка ONELINKS</div>
  <div class="text-center mt-2">Смотрите курсы, пользуйтесь инфопакетами
    и ведите своих клиентов в CRM системе по подписке</div>
</v-sheet>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Subscription extends Vue {
  @Prop({type: Boolean, default: false}) readonly banner!: boolean
}
</script>

<style lang="scss">

</style>
