<template>
<div>
  <TestingFormComponent
      :form="form"
      v-if="!homeworkIsDone"
      v-on="$listeners"
  />
  <TestingResultComponent
      :result="result"
      :last-lesson="lastLesson"
      v-else
      v-on="$listeners"
  />
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {TestingForm} from '../../../../../form/testing/testingForm';
import TestingFormComponent from '../TestingFormComponent.vue';
import TestingResultComponent from './TestingResultComponent.vue';
import {ITestingResult} from '../../../../../entity/testingResult/testingResult.types';
@Component({
  components: {TestingResultComponent, TestingFormComponent}
})
export default class TestingComponent extends Vue {
  @Prop() readonly form!: TestingForm;
  @Prop() readonly result!: ITestingResult;
  @Prop() readonly homeworkIsDone!: boolean;
  @Prop() readonly isHomeworkRequired!: boolean;
  @Prop({default: false}) readonly lastLesson!: boolean;
}
</script>

<style lang="scss">

</style>