<template>
  <v-col class="testing-result pa-6">
    <v-row no-gutters class="d-flex justify-space-between">
      <div class="testing-title">Тестирование</div>
      <svg-icon name="Close" @click="$emit('close')"></svg-icon>
    </v-row>
    <v-col class="pa-0 question mt-5">
      <div class="question-title">Вопрос 1</div>
      <div class="question-body mt-2">Tincidunt volutpat sit arcu facilisis ut suspendisse. Laoreet non pulvinar etiam enim. Nisi
        pulvinar proin enim, cursus risus arcu eu. Gravida sagittis sed nam massa dignissim tempor accumsan. Malesuada
        eget cras malesuada mauris iaculis amet, eu.
      </div>
      <v-col class="pa-0 answers mt-3">
        <div class="answer mt-2">Ответ 1</div>
        <div class="answer right mt-2">Ответ 2</div>
        <div class="answer mt-2">Ответ 3</div>
      </v-col>
    </v-col>
    <v-divider class="mt-4"></v-divider>
    <v-col class="pa-0 question mt-4">
      <div class="question-title">Вопрос 2</div>
      <div class="question-body mt-2">Tincidunt volutpat sit arcu facilisis ut suspendisse. Laoreet non pulvinar etiam enim. Nisi
        pulvinar proin enim, cursus risus arcu eu. Gravida sagittis sed nam massa dignissim tempor accumsan. Malesuada
        eget cras malesuada mauris iaculis amet, eu.
      </div>
      <v-col class="pa-0 answers mt-3">
        <div class="answer mt-2">Ответ 1</div>
        <div class="answer right mt-2">Ответ 2</div>
        <div class="answer mt-2">Ответ 3</div>
      </v-col>
    </v-col>
    <v-divider class="mt-4"></v-divider>
    <v-col class="pa-0 question mt-4">
      <div class="question-title">Вопрос 3</div>
      <div class="question-body mt-2">Tincidunt volutpat sit arcu facilisis ut suspendisse. Laoreet non pulvinar etiam enim. Nisi
        pulvinar proin enim, cursus risus arcu eu. Gravida sagittis sed nam massa dignissim tempor accumsan. Malesuada
        eget cras malesuada mauris iaculis amet, eu.
      </div>
      <v-col class="pa-0 answers mt-3">
        <div class="answer selected mt-2">Ответ 1</div>
        <div class="answer wrong mt-2">Ответ 2</div>
        <div class="answer mt-2">Ответ 3</div>
      </v-col>
    </v-col>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class TestingResultComponentReadOnly extends Vue {
}
</script>

<style lang="scss">
.testing-result {
  .testing-title {
    font-size: 18px;
    font-weight: 600;
  }

  .svg-icon {
    width: 24px !important;
    height: 24px !important;
    cursor: pointer;
  }
  .question {
    font-size: 14px;
    color: #060516;
    .question-title {
      font-weight: 600;
    }
    .answers {
      .answer {
        border: 1px solid #F2F2F2;
        border-radius: 5px;
        padding: 12px;
        &.right {
          background: rgba(39, 174, 96, 0.12);
          border: 1px solid #27AE60;
        }
        &.wrong {
          background: rgba(235, 87, 87, 0.12);
          border: 1px solid #EB5757;
        }
        &.selected {
          background: rgba(66, 109, 246, 0.12);
          border: 1px solid #426DF6;
        }
      }
    }
  }

}
</style>