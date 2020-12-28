<template>
  <el-container class="container_a">
    <el-container class="ml-36 container_b">
      <el-col>
        <Header :isBordered="true" :title="lesson.title" :route="route"></Header>
        <el-col class="course">
          <el-col>
            <el-container class="course-container" ref="courseVideo"></el-container>
            <el-row class="course-video-row">
              <Relation svg-name="Finger" title="Нравится"/>
              <Relation svg-name="Finger" class="svg-down" title="Не нравится"/>
              <Relation svg-name="Chosen" title="В избранное"/>
            </el-row>
            <el-col class="box-container box-padding">
              <h5>ОПИСАНИЕ</h5>
              <span class="desc">{{lesson.description}}</span>
            </el-col>
            <TestingComponent :form="testingForm" @reviewLesson="reviewLesson()" @moveToNextLesson="moveToNextLesson()"
                              @writeMaster="writeMaster()" @passTestAgain="passTestAgain()" :result="testingResult"/>
          </el-col>
        </el-col>
        <el-col class="lessons">
          <el-col>
            <Lessons :course="course" ref="lessons" @moveToLesson="moveToLesson"/>
            <el-col class="box-container box-padding materials">
              <h5>МАТЕРИАЛЫ К УРОКУ</h5>
              <el-row class="course-container mb-8">
                <svg-icon class="svg-wh" name="Doc_PDF"></svg-icon>
                Презентация продуктов FIniko
              </el-row>
              <el-row class="course-container">
                <svg-icon class="svg-wh" name="Doc_PDF"></svg-icon>
                Презентация продуктов FIniko
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
import {Component, Vue, Watch} from "vue-property-decorator";
import {HeaderRouteType} from "@/entity/common/header.types";
import {TestingForm} from "@/form/testing/testingForm";
import Testing from "@/entity/testing/testing";
import {TestingResultResponseType} from "@/entity/testingResult/testingResult.types";
import TestingResult from "@/entity/testingResult/testingResult";
import Relation from "../components/common/Relation.vue"
import {TestingResponseType} from "@/entity/testing/testing.types";
import CourseItem from "@/entity/courseItem/courseItem";
import {CourseItemResponseType} from "@/entity/courseItem/courseItem.type";
import {LessonItemResponseType} from "@/entity/lessonItem/lessonItem.types";
import LessonItem from "@/entity/lessonItem/lessonItem";
import Lessons from "@/UI/components/lessons/Lessons.vue";

@Component({
  components: {
    Lessons,
    Header,
    Button,
    TestingComponent,
    Relation
  },
})
export default class Course extends Vue {
  questions: Testing[] = [];
  course: CourseItem;
  lesson: LessonItem;
  route: HeaderRouteType = {
    name: "training",
    label: "Вернуться к списку курсов",
  };
  testingForm: TestingForm;
  testingResult: TestingResult;

  created() {
    this.fetchData();
  }
  @Watch('$route.params.lessonId')
    onChangeRoute(val: string, oldVal: string) {
      this.fetchData();
    }
  mounted() {
    this.$refs.lessons.$el.style.height = (this.$refs.courseVideo.$el.clientHeight + 1) + 'px';
  }
  //тест
  fetchData() {
    for (let i = 0; i < this.questionsTemp.length; i++) {
      this.questions.push(this.questionsTemp[i]);
    }
    this.course = new CourseItem(this.courseTemp, this.$route.params.lessonId);
    this.lesson = new LessonItem(this.lessonTemp);
    this.testingForm = new TestingForm(this.questions);
    this.testingResult = new TestingResult(this.questions, this.rightAnswers);
  }
  moveToLesson(lessonId: number) {
    this.$router.replace({name: 'course', params: {id: this.$route.params.id, lessonId: lessonId.toString()}})
  }

  reviewLesson() {
  }

  moveToNextLesson() {
  }

  writeMaster() {
  }

  passTestAgain() {
  }

  rightAnswers: TestingResultResponseType = {
    totalRightAnswers: 5
  };
  courseTemp: CourseItemResponseType = {
    lessons: [
        {
          id: 0,
          title: "Вступительный урок",
          lessonPassed: false,
          available: true
        },{
          id: 1,
          title: "Колесо баланса лидера",
          lessonPassed: true,
          available: true
        },{
          id: 2,
          title: "Источники энергии для большого бизнеса",
          lessonPassed: false,
          available: true
        },{
          id: 3,
          title: "Как обрабатывать возражения",
          lessonPassed: false,
          available: false
        },{
          id: 4,
          title: "Как обрабатывать возражения",
          lessonPassed: false,
          available: false
        },{
          id: 4,
          title: "Как обрабатывать возражения",
          lessonPassed: false,
          available: false
        },{
          id: 5,
          title: "Как обрабатывать возражения",
          lessonPassed: false,
          available: false
        },
    ],
    currentLessonId: 0
  }
  lessonTemp: LessonItemResponseType = {
    title: "Как стать Мастером Вовлечения",
    videoLink: "http/",
    description: "Tincidunt volutpat sit arcu facilisis ut suspendisse. Laoreet non pulvinar etiam enim. Nisi pulvinar proin enim, cursus risus arcu eu. Gravida sagittis sed nam massa dignissim tempor accumsan. Malesuada eget cras malesuada mauris iaculis amet, eu. Enim ante imperdiet ut in urna, fermentum nunc et adipiscing. Volutpat sed id ornare pellentesque. Eu suspendisse sit morbi ut nullam cursus a ipsum. Velit hendrerit blandit id quis nulla lectus urna.",
    available: true,
    userViewingVideoDuration: 0
  }
  questionsTemp: TestingResponseType[] = [
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

  .desc {
    color: #818c99;
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

.lessons {
  width: calc(100% - 64% - 16px);
}

.materials {
  margin-top: 68px;
}
</style>