<template>
  <v-row no-gutters class="box-container align-center justify-space-between" :class="[$adaptive.isMobile ? 'pa-4' : 'pa-6']">
    <div class="d-flex flex-column">
      <div class="font-16 font-weight-bold">Бесплатно вам доступны только 5 кандидатов</div>
      <div class="mt-1">Смотрите курсы, пользуйтесь инфопакетами <br>
        и ведите своих клиентов в CRM системе по подписке без ограничений</div>
    </div>
    <div class="d-flex align-center justify-center" :class="[$adaptive.isMobile ? 'full-width mt-4' : 'ml-4']">
      <Button :full-width="$adaptive.isMobile" :small="$adaptive.isMobile" @submit="$emit('openSub')" :class="['mt-0 font-14', $adaptive.isMobile ? '' : 'py-4 px-9']">Оформить подписку</Button>
    </div>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Button from '../common/Button.vue';
@Component({
  components: {Button}
})
export default class CandidateSubscription extends Vue {
}
</script>

<style lang="scss">

</style>
