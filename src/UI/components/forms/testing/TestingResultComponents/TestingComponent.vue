<template>
<div>
  <template v-if="type === homeworkType.Test">
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
  </template>
  <template v-else>
    <FreeTestFormComponent :form="freeForm" v-on="$listeners"/>
  </template>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {TestingForm} from '../../../../../form/testing/testingForm';
import TestingFormComponent from '../TestingFormComponent.vue';
import TestingResultComponent from './TestingResultComponent.vue';
import {ITestingResult} from '../../../../../entity/testingResult/testingResult.types';
import {HomeworkTypesEnum} from '../../../../../entity/common/homeworkType.types';
import {FreeTestForm} from '../../../../../form/freeTest/freeTestForm';
import FreeTestFormComponent from '../../freeTestForm/FreeTestFormComponent.vue';
@Component({
  components: {FreeTestFormComponent, TestingResultComponent, TestingFormComponent}
})
export default class TestingComponent extends Vue {
  @Prop() readonly form!: TestingForm;
  @Prop() readonly freeForm!: FreeTestForm;
  @Prop() readonly result!: ITestingResult;
  @Prop() readonly homeworkIsDone!: boolean;
  @Prop() readonly isHomeworkRequired!: boolean;
  @Prop() readonly type!: string;
  @Prop({default: false}) readonly lastLesson!: boolean;
  homeworkType = HomeworkTypesEnum;
}
</script>

<style lang="scss">

</style>
