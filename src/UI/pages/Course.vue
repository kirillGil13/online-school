<template>
  <el-container class="container_a">
    <el-container class="ml-36 container_b">
      <el-col>
        <Header :isBordered="true" title="Как стать Мастером Вовлечения" :route="route"></Header>
        <el-col class="course">
          <el-col>
            <el-container class="course-container"></el-container>
            <el-row class="course-video-row">
              <span class="relation">
                <svg-icon name="Finger" class="svg-wh"></svg-icon>Нравится
              </span>
              <span class="relation">
                <svg-icon name="Finger" class="svg-wh svg-down"></svg-icon>Не нравится
              </span>
              <span class="relation">
                <svg-icon name="Chosen" class="svg-wh"></svg-icon>В избранное
              </span>
            </el-row>
            <el-col class="box-container box-padding">
              <h5>ОПИСАНИЕ</h5>
              <span
                class="desc"
              >At ornare ut tellus semper sem libero sit mauris. Dictum nulla faucibus vulputate duis. Nibh vel faucibus enim quis ut arcu, faucibus amet. Egestas morbi enim tellus nec placerat at duis. Quis dictumst auctor risus fermentum. Felis lacus ac tempor, urna, arcu orci. Imperdiet morbi at porttitor aliquam id eleifend auctor maecenas. Erat aenean diam justo, sed et tortor, et cras. Sed eu est porttitor augue. Curabitur in eleifend euismod molestie eget leo adipiscing. Fames aliquam tincidunt.</span>
            </el-col>
            <TestingComponent :form="testingForm" @send="send" :result="testingResult"/>
          </el-col>
        </el-col>
        <el-col class="lessons">
          <el-col>
            <el-container class="box-container course-lessons-block"></el-container>
            <el-col class="box-container box-padding materials">
              <h5>МАТЕРИАЛЫ К УРОКУ</h5>
              <el-row class="course-container mb-8">
                <svg-icon class="svg-wh" name="Doc_PDF"></svg-icon>Adipiscing blandit cras maecenas.
              </el-row>
              <el-row class="course-container">
                <svg-icon class="svg-wh" name="Doc_PDF"></svg-icon>Adipiscing blandit cras maecenas.
              </el-row>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import Header from "../components/common/Header.vue";
import Button from "../components/common/Button.vue";
import TestingComponent from "../components/testing/TestingComponent.vue";
import { Component, Vue } from "vue-property-decorator";
import { ICourseItem, ILessons } from "@/entity/courseItem/courseItem.type";
import { HeaderRouteType } from "@/entity/common/header.types";
import { TestingForm } from "@/form/testing/testingForm";
import Testing from "@/entity/testing/testing";
import { TestingResultResponseType } from "@/entity/testingResult/testingResult.types";
import TestingResult from "@/entity/testingResult/testingResult";

@Component({
  components: {
    Header,
    Button,
    TestingComponent,
  },
})
export default class Course extends Vue {
  route: HeaderRouteType = {
    name: "training",
    label: "Вернуться к списку курсов",
  };
  testingForm: TestingForm;
  testingResult: TestingResult;
  constructor() {
    super();
    this.testingForm = new TestingForm(this.questions);
    this.testingResult = new TestingResult(this.questions, this.rightAnswers)
  }
  send() {
    console.log(1);
  }
  //todo server connection
  rightAnswers: TestingResultResponseType = {
      totalRightAnswers: 4
  };
  questions: Testing[] = [
    {
      id: 0,
      question: "Какой самый важный критерий в лидере?",
      answers: [
        {
          id: 0,
          answerOption: "Презентация продуктов",
        },
        {
          id: 1,
          answerOption: "Презентация продуктов",
        },
        {
          id: 2,
          answerOption: "Презентация продуктов",
        },
      ],
    },
    {
      id: 1,
      question: "Какой самый важный критерий в лидере?",
      answers: [
        {
          id: 0,
          answerOption: "Презентация продуктов",
        },
        {
          id: 1,
          answerOption: "Презентация продуктов",
        },
        {
          id: 2,
          answerOption: "Презентация продуктов",
        },
        {
          id: 3,
          answerOption: "Презентация продуктов",
        },
      ],
    },
    {
      id: 2,
      question: "Какой самый важный критерий в лидере?",
      answers: [
        {
          id: 0,
          answerOption: "Презентация продуктов",
        },
        {
          id: 1,
          answerOption: "Презентация продуктов",
        },
        {
          id: 2,
          answerOption: "Презентация продуктов",
        },
      ],
    },
    {
      id: 3,
      question: "Какой самый важный критерий в лидере?",
      answers: [
        {
          id: 0,
          answerOption: "Презентация продуктов",
        },
        {
          id: 1,
          answerOption: "Презентация продуктов",
        },
        {
          id: 2,
          answerOption: "Презентация продуктов",
        },
      ],
    },
    {
      id: 4,
      question: "Какой самый важный критерий в лидере?",
      answers: [
        {
          id: 0,
          answerOption: "Презентация продуктов",
        },
        {
          id: 1,
          answerOption: "Презентация продуктов",
        },
        {
          id: 2,
          answerOption: "Презентация продуктов",
        },
      ],
    },
    {
      id: 5,
      question: "Какой самый важный критерий в лидере?",
      answers: [
        {
          id: 0,
          answerOption: "Презентация продуктов",
        },
        {
          id: 1,
          answerOption: "Презентация продуктов",
        },
        {
          id: 2,
          answerOption: "Презентация продуктов",
        },
      ],
    },
  ];
}
</script>
<style lang="scss">
.container_b {
  padding: 0 36px 96px 0;
}

.course {
  width: 64%;
  margin-right: 16px;
  .course-container {
    padding-top: 56.25%;
  }
}
.course-container {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 12px;
}
.course-video-row {
  margin: 16px 0 16px 24px;
}
.svg-wh {
  width: 36px !important;
  height: 36px !important;
  margin-right: 8px;
}
.relation {
  margin-right: 36px;
}
.lessons {
  width: calc(100% - 64% - 16px);
}
.course-lessons-block {
  padding-bottom: 108%;
}
.desc {
  color: #818c99;
}
.materials {
  margin-top: 68px;
}
</style>