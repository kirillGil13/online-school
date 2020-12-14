<template>
  <el-col>
    <form @submit.prevent>
      <ProgressBar :amount="form.questions.length" :step="step" />
      <TestingQuestion
        v-for="(question, index) in form.questions"
        :key="index"
        :active="step === (index + 1)"
        :question="question"
        @change="change"
        :resultsAnswerId="form.results[index].answerId"
      />
      <el-col>
        <Button
          v-if="step < form.questions.length"
          :disabled="!form.valid(step)"
          @submit="next()"
        >Следующий вопрос</Button>
        <Button
          v-if="step === form.questions.length"
          :disabled="!form.valid(step)"
          @submit="form.send()"
        >Отправить задание</Button>
        <Button class="secondary" v-if="step > 1" @submit="previous()">Назад</Button>
      </el-col>
    </form>
  </el-col>
</template>
<script lang="ts">
import { TestingForm } from "@/form/testing/testingForm";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Button from "../common/Button.vue";
import ProgressBar from "../common/ProgressBar.vue";
import TestingQuestion from "./TestingQuestion.vue";
import { ITestingRequestType } from "@/entity/testing/testing.types";

@Component({
  components: {
    Button,
    ProgressBar,
    TestingQuestion,
  },
})
export default class TestingFormVue extends Vue {
  @Prop() readonly form!: TestingForm;
  step = 1;
  next() {
    this.step += 1;
  }
  previous() {
    this.step -= 1;
  }
  change(id: number) {
    this.form.results[this.step - 1].answerId = id;
  }
  mounted() {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });
  }
}
</script>
<style lang="scss">
.question {
  font-size: 16px;
  color: #060516;
  margin-bottom: 16px;
}

</style>
