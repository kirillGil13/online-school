<template>
  <v-col>
    <v-row class="ma-0">
      <ProgressCircleTesting :result="result"/>
      <v-col>
        <h3>К сожалению, Вы не прошли тестирование.</h3>
        <div class="success_info">Ничего страшного - Вы можете пройти повторно тест через</div>
        <Timer v-if="result.handleTime(60) !== 0 && !showButton" :currentTime="result.handleTime(60)" @stop="stop"/>
        <Button v-else class="again pa-3" @submit="$emit('passTestAgain')">Пройти тест повторно</Button>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ma-0 justify-end btn-container-testing">
      <Button :class="['secondary_blue mr-2', $adaptive.isMobile ? 'py-3' : '']" @submit="$emit('writeMaster')" :full-width="$adaptive.isMobile">Написать автору курса</Button>
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
    ProgressCircleTesting,
    Button,
    Timer,
  },
})
export default class Proceed extends Vue {
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
.btn-container-testing {
  flex-wrap: nowrap;
}
</style>
