<template>
  <div>
    <div class="d-flex flex-row cont">
      <v-avatar size="36" class="mr-3">
        <v-img :src="comment.author.photoLink" alt=""/>
      </v-avatar>
      <div class="d-flex flex-column comment-container">
        <div class="comment py-3 px-4">
          <v-col class="pa-0">
            <v-row no-gutters class="mb-1">
              <h4 class="mr-3">{{ comment.fullName }}</h4>
              <div class="desc">{{ comment.createdAt }}</div>
            </v-row>
            <v-row no-gutters :id="'comment' + comment.id">
              {{ comment.message }}
            </v-row>
            <v-row no-gutters class="d-flex flex-row justify-space-between align-end mt-2">
              <span class="comment-action" @click="$emit('respond', {id: comment.id})">Ответить</span>
              <div class="d-flex flex-row justify-space-between">
                <Relation class="mr-3" svg-name="Finger" :title="comment.countLikes"
                          :svg-class="comment.isLiked !== null && comment.isLiked ? 'active-like' : ''"
                          @click="$emit('handleLike', {id: comment.id, like: true, type: commentType.Comment})"/>
                <Relation svg-name="Finger" :title="comment.countDislikes"
                          :svg-class="['svg-down', comment.isLiked !== null && !comment.isLiked ? 'active-dislike' : '']"
                          @click="$emit('handleDislike', {id: comment.id, like: false, type: commentType.Comment})"/>
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
              <v-avatar size="24" class="mr-3">
                <v-img :src="item.author.photoLink" alt=""/>
              </v-avatar>
              <div class="d-flex flex-column comment-container">
                <div class="comment child py-3 px-4">
                  <v-col class="pa-0">
                    <v-row no-gutters class="mb-1">
                      <h4 class="mr-3">{{ item.fullName }}</h4>
                      <div class="desc">{{ item.createdAt }}</div>
                    </v-row>
                    <v-row no-gutters :id="'answer' + comment.id" v-html="comment.prettierMsg(index) ? comment.prettierMsg(index) : item.message">
                    </v-row>
                    <v-row no-gutters class="d-flex flex-row justify-space-between align-end mt-2">
                    <span class="comment-action"
                          @click="$emit('respond', {id: comment.id, index: index})">Ответить</span>
                      <div class="d-flex flex-row justify-space-between">
                        <Relation class="mr-3" svg-name="Finger" :title="item.countLikes"
                                  :svg-class="item.isLiked !== null && item.isLiked ? 'active-like' : ''"
                                  @click="$emit('handleLike', {id: comment.id, like: true, type: commentType.Answer, answerId: item.id})"/>
                        <Relation svg-name="Finger" :title="item.countDislikes"
                                  :svg-class="['svg-down', item.isLiked !== null && !item.isLiked ? 'active-dislike' : '']"
                                  @click="$emit('handleDislike', {id: comment.id, like: false, type: commentType.Answer, answerId: item.id})"/>
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

@Component({
  components: {Relation}
})
export default class Comments extends Vue {
  @Prop({required: true, default: []}) readonly comment!: IComments;
  commentType = CommentTypesEnum;
  show = false;

  @Watch('comment.answers.length')
  onLengthChange(val: number, oldVal: number): void {
    if (val > oldVal) {
      this.show = true;
    }
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
  background: rgba(66, 109, 246, 0.12);
  border-radius: 2px 16px 16px 16px;
  width: 100%;

  .desc {
    font-size: 12px;
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
</style>
