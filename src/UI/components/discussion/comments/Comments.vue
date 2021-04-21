<template>
  <div>
    <div class="d-flex flex-row cont">
      <v-avatar size="36" class="mr-3" :color="comment.author.photoLink ? '#F0F2F6' :randomColor(comment.author.id % 10)">
        <template v-slot:default v-if="comment.author.photoLink">
          <v-img :src="comment.author.photoLink" alt=""/>
        </template>
        <template v-else v-slot:default>
          <span class="font-weight-bold" style="color: #fff">{{(comment.author.name[0] + comment.author.lastName[0]).toUpperCase()}}</span>
        </template>
      </v-avatar>
      <div class="d-flex flex-column comment-container">
        <div class="comment py-3 px-4">
          <v-col class="pa-0" v-if="form.showChangeComment && comment.id === form.commentId">
            <CommentsChangeFormComponent :form="form" @closeChange="closeChangeComment" @changeComment="$emit('changeComment', comment.id)"/>
          </v-col>
          <v-col class="pa-0" v-else>
            <v-row no-gutters class="mb-1 d-flex justify-space-between">
              <div class="d-flex flex-row">
                <h4 class="mr-3">{{ comment.fullName }}</h4>
                <div class="desc">{{ comment.createdAt }}</div>
              </div>
              <div class="pr-0" v-if="comment.isMy">
                <Select class-name="select_content_comment action" :selects="selects" v-on="$listeners" :id="comment.id">
                  <template v-slot:act>
                    <div class="d-flex justify-end pr-0">
                      <svg-icon
                          name="Dots"
                          class="dots"
                      >
                      </svg-icon>
                    </div>
                  </template>
                </Select>
              </div>
            </v-row>
            <v-row no-gutters :id="'comment' + comment.id">
              {{ comment.message }}
            </v-row>
            <v-row no-gutters class="d-flex flex-row justify-space-between align-end mt-2">
              <span class="comment-action" @click="$emit('respond', {id: comment.id})">Ответить</span>
              <div class="d-flex flex-row justify-space-between">
                <Relation class="mr-3" svg-name="Finger" :title="comment.countLikes"
                          :svg-class="comment.isLiked !== null && comment.isLiked ? 'active-like' : ''"
                          @click="$emit('handleLike', {id: comment.id, like: true, type: commentType.Comment, kind: 'like'})"/>
                <Relation svg-name="Finger" :title="comment.countDislikes"
                          :svg-class="['svg-down', comment.isLiked !== null && !comment.isLiked ? 'active-dislike' : '']"
                          @click="$emit('handleLike', {id: comment.id, like: false, type: commentType.Comment, kind: 'dislike'})"/>
              </div>
            </v-row>
          </v-col>
        </div>
        <div v-if="comment.answers">
          <span v-if="comment.answers.length > 1 && !show" class="comment-action mt-2" @click="show = true">
              <svg-icon class="mr-2" name="Comment_Arrow"></svg-icon>Еще {{ comment.getAnswersLength() }}
          </span>
          <div v-else-if="comment.answers.length === 1 || show">
            <span v-if="comment.answers.length > 1" class="comment-action mt-2" @click="show = false">
              <svg-icon class="mr-2 svg-up" name="Comment_Arrow"></svg-icon>Скрыть
            </span>
            <div class="mt-4 ml-4 d-flex flex-row cont"
                 v-for="(item, index) in comment.answers"
                 :key="index">
              <v-avatar size="24" class="mr-3" :color="item.author.photoLink ? '#F0F2F6' :randomColor(item.author.id % 10)">
                <template v-slot:default v-if="item.author.photoLink">
                  <v-img :src="item.author.photoLink" alt=""/>
                </template>
                <template v-else v-slot:default>
                  <span class="font-weight-bold" style="color: #fff">{{(item.author.name[0] + item.author.lastName[0]).toUpperCase()}}</span>
                </template>
              </v-avatar>
              <div class="d-flex flex-column comment-container">
                <div class="comment child py-3 px-4">
                  <v-col class="pa-0" v-if="form.showChangeAnswer && item.id === form.answerId">
                    <CommentsChangeFormComponent :form="form" @closeChange="closeChangeAnswer" @changeComment="$emit('changeAnswer', {answer: item.id, comment: comment.id})"/>
                  </v-col>
                  <v-col class="pa-0" v-else>
                    <v-row no-gutters class="mb-1 d-flex justify-space-between">
                      <div class="d-flex flex-row">
                        <h4 class="mr-3">{{ item.fullName }}</h4>
                        <div class="desc">{{ item.createdAt }}</div>
                      </div>
                      <div class="pr-0" v-if="item.isMy">
                        <Select class-name="select_content_comment action" :selects="selects" @extraAction="extraActionAnswer" :id="item.id">
                          <template v-slot:act>
                            <div class="d-flex justify-end pr-0">
                              <svg-icon
                                  name="Dots"
                                  class="dots"
                              >
                              </svg-icon>
                            </div>
                          </template>
                        </Select>
                      </div>
                    </v-row>
                    <v-row no-gutters :id="'answer' + comment.id"
                           v-html="comment.prettierMsg(index) ? comment.prettierMsg(index) : item.message">
                    </v-row>
                    <v-row no-gutters class="d-flex flex-row justify-space-between align-end mt-2">
                    <span class="comment-action"
                          @click="$emit('respond', {id: comment.id, index: index})">Ответить</span>
                      <div class="d-flex flex-row justify-space-between">
                        <Relation class="mr-3" svg-name="Finger" :title="item.countLikes"
                                  :svg-class="item.isLiked !== null && item.isLiked ? 'active-like' : ''"
                                  @click="$emit('handleLike', {id: comment.id, like: true, type: commentType.Answer, answerId: item.id, kind: 'like'})"/>
                        <Relation svg-name="Finger" :title="item.countDislikes"
                                  :svg-class="['svg-down', item.isLiked !== null && !item.isLiked ? 'active-dislike' : '']"
                                  @click="$emit('handleLike', {id: comment.id, like: false, type: commentType.Answer, answerId: item.id, kind: 'dislike'})"/>
                      </div>
                    </v-row>
                  </v-col>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {IComments} from '../../../../entity/comments/comments.types';
import Relation from '../../common/Relation.vue';
import {CommentTypesEnum} from '../../../../entity/common/comment.types';
import {ISelect} from '../../../../entity/select/select.types';
import Select from '../../common/Select.vue';
import {CommentsChangeForm} from '../../../../form/commentsChange/commentsChangeForm';
import CommentsChangeFormComponent from '../../forms/commentsChangeForm/CommentsChangeFormComponent.vue';

@Component({
  components: {CommentsChangeFormComponent, Select, Relation}
})
export default class Comments extends Vue {
  @Prop({required: true, default: []}) readonly comment!: IComments;
  @Prop() readonly form!: CommentsChangeForm;
  @Prop() readonly selects!: ISelect[];
  commentType = CommentTypesEnum;
  show = false;

  @Watch('comment.answers.length')
  onLengthChange(val: number, oldVal: number): void {
    if (val > oldVal) {
      this.show = true;
    }
  }

  closeChangeComment(): void {
    this.form.showChangeComment = false;
  }

  closeChangeAnswer(): void {
    this.form.showChangeAnswer = false;
  }

  extraActionAnswer(answerId: number, index: number): void {
    this.$emit('extraActionAnswer', answerId, this.comment.id, index);
  }

  randomColor(i: number) {
    const COLORS = [
      '#56CCF2',
      '#BB6BD9',
      '#6FCF97',
      '#F2C94C',
      '#967CBA',
      '#FF9960',
      '#566FF2',
      '#FF5733',
      '#FF89C9',
      '#56F2DF',
      '#F38460',
      '#939ED6',
      '#F271A0',
      '#2ABF93',
      '#FF9C9C',
      '#6EC1F0',
      '#3B4244'
    ];
    return COLORS[i || 0];
  }
}
</script>

<style lang="scss">
.cont {
  flex-wrap: nowrap !important;
}

.comment-container {
  width: 100%;
}

.comment {
  background: #FFFFFF;
  border-radius: 2px 16px 16px 16px;
  border: 1px solid #F2F2F2;
  width: 100%;
  box-shadow: 0px 14px 12px rgba(0, 0, 0, 0.01);

  .desc {
    font-size: 12px;
    line-height: 180%;
    color: #5F739C;
  }

  .relation {
    margin-right: 0;
    font-size: 12px;

    .icon-container {
      width: auto;
      height: auto;
      background-color: transparent;
      margin-right: 4px;
    }
  }

  .icon-container
  .active-like {
    path {
      fill: #27AE60 !important;
    }
  }

  .active-dislike {
    path {
      fill: #eb5757 !important;
    }
  }
}
.select_content_comment {
  margin-top: 20px !important;
  border-radius: 12px !important;
  min-width: 100px !important;
  max-height: 296px !important;

  &.action {
    #select1 {
      .v-list-item__title {
        color: #EB5757 !important;
      }
    }
  }
}
.comment-action {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: #426DF6;

  .svg-up {
    transform: rotate(180deg);
  }
}

.dots {
  transform: rotate(90deg) !important;
}
</style>
