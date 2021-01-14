<template>
  <v-col>
      <Header :isBordered="true" :route="route" :title="lesson.title"></Header>
      <v-row class="mt-6">
        <div class="course" >
            <v-responsive :aspect-ratio="16/9" content-class="course-container"></v-responsive>
            <v-row class="course-video-row">
              <Relation svg-name="Finger" title="Нравится"/>
              <Relation svg-class="svg-down" svg-name="Finger" title="Не нравится"/>
              <Relation svg-name="Chosen" title="В избранное"/>
            </v-row>
            <v-col class="box-container pa-6">
              <h5>ОПИСАНИЕ</h5>
              <span class="desc">{{ lesson.description }}</span>
            </v-col>
            <TestingComponent
                :form="testingForm"
                :result="testingResult"
                @moveToNextLesson="moveToNextLesson()"
                @passTestAgain="passTestAgain()"
                @reviewLesson="reviewLesson()"
                @writeMaster="writeMaster()"
            />
          </div>
        <div class="lessons">
            <Lessons ref="lessons" :course="course" @moveToLesson="moveToLesson"/>
            <v-col class="box-container pa-6 materials">
              <h5>МАТЕРИАЛЫ К УРОКУ</h5>
              <v-row class="course-container material align-center mb-5 mt-4 pa-3">
                <svg-icon class="svg-wh" name="Doc_PDF"></svg-icon>
                Презентация продуктов FIniko
              </v-row>
              <v-row class="course-container material align-center pa-3">
                <svg-icon class="svg-wh" name="Doc_PDF"></svg-icon>
                Презентация продуктов FIniko
              </v-row>
            </v-col>
        </div>
      </v-row>
  </v-col>
</template>
<script lang="ts">
import Header from '../../components/common/Header.vue';
import Button from '../../components/common/Button.vue';
import TestingComponent from '../../components/testing/TestingComponent.vue';
import {Component, Vue, Watch} from 'vue-property-decorator';
import {HeaderRouteType} from '@/entity/common/header.types';
import {TestingForm} from '@/form/testing/testingForm';
import Testing from '@/entity/testing/testing';
import {TestingResultResponseType} from '@/entity/testingResult/testingResult.types';
import TestingResult from '@/entity/testingResult/testingResult';
import Relation from '../../components/common/Relation.vue';
import {TestingResponseType} from '@/entity/testing/testing.types';
import CourseItem from '@/entity/courseItem/courseItem';
import {CourseItemResponseType} from '@/entity/courseItem/courseItem.type';
import {LessonItemResponseType} from '@/entity/lessonItem/lessonItem.types';
import LessonItem from '@/entity/lessonItem/lessonItem';
import Lessons from '@/UI/components/lessons/Lessons.vue';
import {RouterNameEnum} from '@/router/router.types';

@Component({
  components: {
    Lessons,
    Header,
    Button,
    TestingComponent,
    Relation,
  },
})
export default class Course extends Vue {
  questions: Testing[] = [];
  course!: CourseItem;
  lesson!: LessonItem;
  route: HeaderRouteType = {
    name: 'Training',
    label: 'Вернуться к списку курсов',
  };
  testingForm!: TestingForm;
  testingResult!: TestingResult;
  rightAnswers: TestingResultResponseType = {
    totalRightAnswers: 3,
  };
  courseTemp: CourseItemResponseType = {
    lessons: [
      {
        id: 0,
        title: 'Вступительный урок',
        lessonPassed: false,
        available: true,
      },
      {
        id: 1,
        title: 'Колесо баланса лидера',
        lessonPassed: true,
        available: true,
      },
      {
        id: 2,
        title: 'Источники энергии для большого бизнеса',
        lessonPassed: false,
        available: true,
      },
      {
        id: 3,
        title: 'Как обрабатывать возражения',
        lessonPassed: false,
        available: false,
      },
      {
        id: 4,
        title: 'Как обрабатывать возражения',
        lessonPassed: false,
        available: false,
      },
      {
        id: 4,
        title: 'Как обрабатывать возражения',
        lessonPassed: false,
        available: false,
      },
      {
        id: 5,
        title: 'Как обрабатывать возражения',
        lessonPassed: false,
        available: false,
      },
    ],
    currentLessonId: 0,
  };
  lessonTemp: LessonItemResponseType = {
    title: 'Как стать Мастером Вовлечения',
    videoLink: 'http/',
    description:
        'Tincidunt volutpat sit arcu facilisis ut suspendisse. Laoreet non pulvinar etiam enim. Nisi pulvinar proin enim, cursus risus arcu eu. Gravida sagittis sed nam massa dignissim tempor accumsan. Malesuada eget cras malesuada mauris iaculis amet, eu. Enim ante imperdiet ut in urna, fermentum nunc et adipiscing. Volutpat sed id ornare pellentesque. Eu suspendisse sit morbi ut nullam cursus a ipsum. Velit hendrerit blandit id quis nulla lectus urna.',
    available: true,
    userViewingVideoDuration: 0,
  };
  questionsTemp: TestingResponseType[] = [
    {
      id: 0,
      question: 'Какой самый важный критерий в лидере?',
      answers: [
        {
          id: 0,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 1,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 2,
          answerOption: 'Презентация продуктов',
        },
      ],
    },
    {
      id: 1,
      question: 'Какой самый важный критерий в лидере?',
      answers: [
        {
          id: 0,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 1,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 2,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 3,
          answerOption: 'Презентация продуктов',
        },
      ],
    },
    {
      id: 2,
      question: 'Какой самый важный критерий в лидере?',
      answers: [
        {
          id: 0,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 1,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 2,
          answerOption: 'Презентация продуктов',
        },
      ],
    },
    {
      id: 3,
      question: 'Какой самый важный критерий в лидере?',
      answers: [
        {
          id: 0,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 1,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 2,
          answerOption: 'Презентация продуктов',
        },
      ],
    },
    {
      id: 4,
      question: 'Какой самый важный критерий в лидере?',
      answers: [
        {
          id: 0,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 1,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 2,
          answerOption: 'Презентация продуктов',
        },
      ],
    },
    {
      id: 5,
      question: 'Какой самый важный критерий в лидере?',
      answers: [
        {
          id: 0,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 1,
          answerOption: 'Презентация продуктов',
        },
        {
          id: 2,
          answerOption: 'Презентация продуктов',
        },
      ],
    },
  ];

  created(): void {
    this.fetchData();
  }

  @Watch('$route.params.lessonId')
  onChangeRoute(): void {
    this.fetchData();
  }

  //тест
  fetchData(): void {
    for (let i = 0; i < this.questionsTemp.length; i++) {
      this.questions.push(this.questionsTemp[i]);
    }
    this.course = new CourseItem(this.courseTemp, this.$route.params.lessonId);
    this.lesson = new LessonItem(this.lessonTemp);
    this.testingForm = new TestingForm(this.questions);
    this.testingResult = new TestingResult(this.questions, this.rightAnswers);
  }

  moveToLesson(lessonId: number): void {
    this.$router.replace({
      name: RouterNameEnum.Course,
      params: {id: this.$route.params.id, lessonId: lessonId.toString()},
    });
  }

  // reviewLesson() {}
  //
  // moveToNextLesson() {}
  //
  // writeMaster() {}
  //
  // passTestAgain() {}
}
</script>
<style lang="scss">
.container_b {
  padding: 0 36px 96px 0;
}

.course {
  width: 64%;
  .course-container {
  }

  .desc {
    color: #818c99;
  }
}

.course-container {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  &.material {
    border-radius: 5px;
  }
}

.course-video-row {
  margin: 16px 0 16px 24px;
}

.lessons {
  position: relative;
  width: calc(100% - 64% - 16px);
  margin-left: 16px;
}

.materials {
  margin-top: 68px;
}
</style>
