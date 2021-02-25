<template>
  <div class="message-container d-flex flex-column">
    <Notification date="17:06" title="Новый партнер!" desc="Руслан стал вашим партнером"/>
    <Notification date="17:06" title="Курс как повысить звезду от Ильгиза  •  Урок 1" desc="Руслан приступил к просмотру урока"/>
    <Notification date="17:06" title="Курс как повысить звезду от Ильгиза  •  Урок 1" desc="Руслан выполнил задание на 82%" :active="true"/>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';
import Notification from '@/UI/components/note/Notification';
@Component({
  components: {Notification}
})
export default class PartnerActions extends Vue {}
</script>

<style lang="scss">

</style>