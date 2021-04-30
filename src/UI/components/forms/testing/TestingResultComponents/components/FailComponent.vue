<template>
  <v-col>
    <v-row class="ma-0">
      <ProgressCircleTesting :result="result"/>
      <v-col>
        <h3>К сожалению,Вы не прошли тестирование.</h3>
        <div class="success_info"
        >Внимательно пересмотрите видео для того, чтобы повторно пройти тестирование и перейти к следующему
                    уроку</div>
        <Timer v-if="result.handleTime(60) !== 0 && !showButton" :currentTime="result.handleTime(60)" @stop="stop"/>
        <Button v-else class="again pa-3" @submit="$emit('passTestAgain')">Пройти тест повторно</Button>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ma-0 justify-end">
      <Button :class="[$adaptive.isMobile ? 'py-3' : '']" @submit="$emit('reviewLesson')" :full-width="$adaptive.isMobile">Пересмотреть урок</Button>
    </v-row>
  </v-col>
</template>
<script lang="ts">
import TestingResult from '../../../../../../entity/testingResult/testingResult';
import ProgressCircleTesting from '../../../../progress/ProgressCircleTesting.vue';
import Button from '../../../../common/Button.vue';
import {Component, Prop, Vue} from 'vue-property-decorator';
import Timer from '../../../../common/Timer.vue';

@Component({
  components: {
    Timer,
    ProgressCircleTesting,
    Button,
  },
})
export default class Fail extends Vue {
  @Prop() readonly result!: TestingResult;
  showButton = false;

  stop(isZero: boolean): void {
    this.showButton = isZero;
  }
}
</script>
<style lang="scss">
.again {
  font-size: 12px;
}
</style>
