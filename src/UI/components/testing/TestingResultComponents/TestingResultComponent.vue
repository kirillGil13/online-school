<template>
  <el-col>
    <SuccessComponent :result="result" @submit="$listeners" v-if="buttonType === buttonTypes.SUCCESS"/>
    <ProceedComponent :result="result" @submit="$listeners" v-if="buttonType === buttonTypes.PROCEED"/>
    <FailComponent :result="result" @submit="$listeners" v-if="buttonType === buttonTypes.FAIL"/>
  </el-col>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TestingResult from "@/entity/testingResult/testingResult";
import { TestingResultComponentsEnum } from "@/entity/testingResultComponents/testingResultComponents.types";
import SuccessComponent from "./components/SuccessComponent.vue";
import ProceedComponent from "./components/ProceedComponent.vue";
import FailComponent from "./components/FailComponent.vue";

@Component({
  components: {
      SuccessComponent,
      ProceedComponent,
      FailComponent
  },
})
export default class TestingResultComponent extends Vue {
  @Prop() readonly result!: TestingResult;
  @Prop() readonly buttonType!: string;
  private get buttonTypes() {
        return TestingResultComponentsEnum;
    }
}
</script>
<style lang="scss">
h3 {
  margin-bottom: 4px;
  margin-top: 0;
}
.info {
  color: #5f739cbd;
}
.svg {
  height: 24px !important;
  width: 24px !important;
  margin-right: 14px;
  &.next {
    height: 16px !important;
    width: 16px !important;
  }
}
.el-divider {
  margin-bottom: 0;
}
</style>