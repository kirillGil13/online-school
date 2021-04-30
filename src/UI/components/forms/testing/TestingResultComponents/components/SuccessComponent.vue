<template>
  <v-col>
    <v-row class="ma-0">
      <ProgressCircleTesting :result="result"/>
      <v-col>
        <h3>Поздравляем -Вы выполнили задание!</h3>
        <div v-if="!lastLesson" class="success_info">Теперь Вы можете перейти к следующему уроку.</div>
        <Button class="again pa-3" @submit="$emit('passTestAgain')">Пройти тест повторно</Button>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ma-0 justify-end btn-container-testing">
      <Button :class="['with_icon secondary_blue mr-2', $adaptive.isMobile ? 'py-3' : '']" @submit="$emit('reviewLesson')" :full-width="$adaptive.isMobile">
        <svg-icon class="svg" name="Return"></svg-icon>
        Пересмотреть урок
      </Button>
      <Button v-if="!lastLesson" :class="['with_icon', $adaptive.isMobile ? 'py-3' : '']" @submit="$emit('moveToNextLesson')">
        <svg-icon class="svg next" name="Next" :style="{marginRight: $adaptive.isMobile ? '0' : ''}"></svg-icon>
        {{$adaptive.isMobile ? '' : 'Перейти к следующему уроку' }}
      </Button>
    </v-row>
  </v-col>
</template>
<script lang="ts">
import TestingResult from '../../../../../../entity/testingResult/testingResult';
import ProgressCircleTesting from '../../../../progress/ProgressCircleTesting.vue';
import Button from '../../../../common/Button.vue';
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  components: {
    ProgressCircleTesting,
    Button,
  },
})
export default class Success extends Vue {
  @Prop() readonly result!: TestingResult;
  @Prop({default: false}) readonly lastLesson!: boolean;
}
</script>
<style lang="scss">
.again {
  font-size: 12px;
}
.btn-container-testing {
  flex-wrap: nowrap;
  .with_icon {
    display: flex;
    justify-content: center;
  }
}
</style>
