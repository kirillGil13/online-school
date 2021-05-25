<template>
  <v-responsive class="border" :style="{height: isChat ? '500px': '100%'}" content-class="course-lessons-block" :aspect-ratio="$adaptive.isMobile ? 9/6  : isChat ? 2/5 : 42/44">
      <div class="lessons-block  d-flex flex-column align-end box-container">
         <v-col v-if="isChat" align-self="start" class=" d-flex  flex-row align-center justify-space-between chat-header px-3 py-3" style="max-height: 50px">
          <span class="chat-title">Чат</span>
          <Button class="btn-close-chat" style="background-color: none !important" @submit="toggleOpenChat"><v-icon>mdi-close</v-icon></Button>
         </v-col>
         <v-col class="lesson-container  pa-0"  v-if="!isChat"  align-self="start" :style="{height: $adaptive.isMobile ? '100%' : ''}">

       
          <ul class="lesson-list">
            <li
                v-for="(lesson, index) in course.lessons"
                :key="index"
            >
              <router-link :to="course.cost === 0 && {name: $routeRules.Lesson, params: {lessonId: lesson.id.toString()}}"
                         active-class="lesson-current" :id="`lesson${index}`"
                         :class="[ (course.resolveType(index, $route.params.lessonId) === lessonType.LOCKED || user.subscription.isActual === null || course.cost > 0) ? 'lesson-locked' : '']">
              <svg-icon class="svg-wh" :name="user.subscription.isActual && course.cost === 0 ? course.resolveType(index, $route.params.lessonId) : lessonType.LOCKED"></svg-icon>
              <div class="lesson_name">
                <span class="desc d-flex justify-space-between">Урок {{ lesson.number }} </span>
                {{ lesson.name }}
              </div>
              <span class="lesson_duration">{{lesson.duration}}</span>
            </router-link>
            </li>
          </ul>
        </v-col>
        <div class="chat-container" ref="chatContainer" id="chatContainer" v-else>
          <SingleChat :course="course" style="width: 100% !important"/>
        </div>
        <div v-if="!isChat || !$adaptive.isMobile && $route.name === $routeRules.Lesson" class="lesson-btn pa-2" :style="{justifyContent: last ? 'flex-start' : '', width: '100%'}" >
          <v-col  class="d-flex pa-0" style="width: 100%;">
            <Button  @submit="toggleOpenChat" class="d-flex justify-center align-center mt-0" style="width: 100%"><svg-icon class="mr-2" name="Chat"></svg-icon><span style="font-size: 12px;">Задать вопрос</span></Button>
            <Button :class="['with_icon secondary_white ml-3 d-flex justify-center', $adaptive.isMobile ? 'py-4' : '']"
                    style=" width: 20% !important"
                    @submit="$emit('moveToNextLesson', course.lessons.find(item => item.id === parseInt($route.params.lessonId)).number)"
                    v-if="!last && $route.params.lessonId" small full-width>
              <svg-icon name="Next" :style="{marginRight: $adaptive.isMobile ? 0 : ''}"></svg-icon>
            </Button>
          </v-col>
        </div>
        <div class="send-message" style="width:100%" v-else>
          <SendMessage @sendMessage="sendMessage"/>
        </div>
      </div>
  </v-responsive>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import Button from '@/UI/components/common/Button.vue';
import {LessonsTypesEnum} from '@/entity/common/lessons.types';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';
import SingleChat from '../../components/chat/singleChat/SingleChat.vue';
import SendMessage  from '../../components/chat/singleChat/sendMessage/SendMessage.vue';
import {WebSocketStore} from '../../../store/modules/WebSocket';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';

@Component({
  components: {
    Button,
    SendMessage,
    SingleChat
  },
})
export default class Lessons extends Vue {
  @Prop() readonly course!: ICourseItem;
  lessonType = LessonsTypesEnum;
  isChat = false;

  @Watch('isChat',{ immediate: true })
  async takeChat(): Promise<void> {

  }
  get last(): boolean {
    return (this.course.lessons[this.course.lessons.length - 1].id.toString() === this.$route.params.lessonId);
  }

  get socket(): WebSocket | null {
    return WebSocketStore.socket;
  }


  toggleOpenChat(): void {
    this.isChat = !this.isChat
  }

  sendMessage(message: string): void {
    if(message.length === 0) {
      return
    }
    const el = {
      type: "send-message-service_type",
      data: {
        purposeAccountId: this.course.author.id ,
        text: message.toString()

      }
    }
   
    this.socket!.send(JSON.stringify(el));

    const container =  document.getElementById('chatContainer');
    container!.scrollTop = container!.scrollHeight;
  }
  
  get user(): IUser | null {
    return AuthStore.user;
  }
}
</script>

<style lang="scss">
.chat-header {
  width: 100%;
}

.chat-container {
      position: relative;
      border-bottom: 1px solid #f2f2f2;
      width: 100%;
      overflow: scroll;
      height: 100%;
}

.btn-close-chat {
  background: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

.chat-title {
  font-weight: 500;
  font-size: 24px;
  color: #000000
}
.border {
  border-radius: 12px;
  box-shadow: 0px 14px 12px rgba(0, 0, 0, 0.01);
}

.course-lessons-block {
  position: relative;
  border-radius: 12px;

  .lessons-block {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    max-height: 500px;

    .lesson-container {
      position: relative;
      width: 100%;
      overflow: scroll;
      ul {
        padding: 0;
        list-style: none;
        margin: 0;
        width: 100%;

        li {
          a {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 12px;
            color: #060516;
            padding: 12px 18px 12px 18px;

            &#lesson0 {
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
            }

            &:hover {
              background-color: rgba(87, 81, 183, 0.12) !important;
            }

            &.lesson-current {
              background-color: rgba(87, 81, 183, 0.12);
            }

            &.lesson-locked {
              background-color: #f2f2f2;
            }

            .svg-wh {
              height: 24px !important;
              width: 24px !important;
              margin-right: 14px;
              display: flex;
              justify-content: center;
              align-content: center;
            }

            .lesson_name {
              display: flex;
              flex-direction: column;
              width:100%;

              .desc {
                color: #5f739c;
                font-size: 10px;
                line-height: 95%;
              }
            }

            .lesson_duration {
              font-size: 10px;
              line-height: 150%;
              display: flex;
              align-items: center;
              text-align: right;
              color: #5F739C;
            }
          }
        }
      }
    }

    .lesson-btn {
      border-top: 1px solid #F2F2F2;
      display: flex;
      flex-direction: row;
      width: 100%;
      .with_icon {
        margin-top: 0;
        padding: 16px 0;
        justify-content: center;

        .svg-icon {
          height: 16px !important;
          width: 16px !important;
        }

        &.secondary_white {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
