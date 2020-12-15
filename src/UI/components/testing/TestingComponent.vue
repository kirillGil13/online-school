<template>
  <el-col class="box-container box-padding mt-16">
    <h5>Тестирование</h5>
    <TestingFormVue :form="form" v-on="$listeners" v-if="active"/>
    <TestingResultComponent v-if="!active" :result="result" :buttonType="result.result()"/>
  </el-col>
</template>
<script lang="ts">
import Button from "../common/Button.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import TestingFormVue from "./TestingForm.vue";
import { TestingForm } from "@/form/testing/testingForm";
import TestingResult from "@/entity/testingResult/testingResult";
import TestingResultComponent from "./TestingResultComponents/TestingResultComponent.vue";

@Component({
  components: {
    TestingFormVue,
    Button,
    TestingResultComponent
  },
})
export default class TestingComponent extends Vue {
    active = true;
    @Prop() readonly form!: TestingForm;
    @Prop() readonly result!: TestingResult;
}
</script>
<style lang="scss">
button {
  float: right;
}
</style>