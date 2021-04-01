<template>
  <v-form class="form" @submit.prevent="$emit('sendCode')">
    <div class="d-flex justify-center form-desc mt-9">
      <div>
        Упс... <br>
        Кажется возникла какая то ошибка или<br>
        истек срок эксплуатации ссылки.<br> Попробуйте отправить письмо <strong>еще раз</strong>
      </div>
    </div>
    <div class="d-flex justify-center">
      <router-link class="form-second-action mt-6" :to="{ name: $routeRules.AuthLogin }">Вернуться к входу</router-link>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class CheckCodeFailed extends Vue {
}
</script>

<style lang="scss">

</style>
