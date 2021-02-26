<template>
  <v-col>
    <v-row class="ma-0">
      <ProgressCircleTesting :result="result"/>
      <v-col>
        <h3>К сожалению, вы не прошли тестирование.</h3>
        <span class="success_info">Ничего страшного - вы можете пройти повторно тест через</span>
        <Timer v-if="!showButton" :currentTime="5" @stop="stop"/>
        <Button v-if="showButton" class="again pa-3" @submit="$emit('passTestAgain')">Пройти тест повторно</Button>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ma-0 justify-end">
      <Button class="secondary_blue mr-2" @submit="$emit('writeMaster')">Написать наставнику</Button>
      <Button @submit="$emit('reviewLesson')">Пересмотреть урок</Button>
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
  float: left;
}
</style>
