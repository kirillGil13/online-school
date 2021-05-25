<template>
  <v-row no-gutters :class="['discussion-container d-flex flex-row align-start mt-2', form.author ? '' : 'pt-3']">
    <v-avatar size="36" class="mr-3" :color="user.photoLink ? '#F0F2F6' :randomColor(user.id % 10)">
      <template v-slot:default v-if="user.photoLink">
        <v-img :src="user.photoLink" alt=""/>
      </template>
      <template v-else v-slot:default>
        <span class="font-weight-bold" style="color: #fff">{{ (user.name[0] + user.lastName[0]).toUpperCase() }}</span>
      </template>
    </v-avatar>
    <v-col class="pa-0 d-flex flex-row align-end">
      <div class="message-container-full">
        <div class="respond d-flex flex-row justify-space-between" v-if="form.author">
          <div class="respond__text">Ваш ответ <span>{{ form.author }}</span></div>
          <div class="respond__action" v-if="!form.fullScreen" @click="cancel">
            <v-icon color="error" small>mdi-close</v-icon>
          </div>
        </div>
        <v-textarea
            @keydown.enter.prevent="$emit('postComment')"
            v-model="form.message"
            dense
            auto-grow
            single-line
            row-height="10"
            id="message-comment"
            filled
            placeholder="Ваше сообщение"
            rows="1"
            hide-details
            class="message-field"
        ></v-textarea>
      </div>
      <div class="d-flex justify-center align-center mb-1">
        <svg-icon class="send-icon" :class="[form.disabled ? 'disabled-post' : '']" name="Send" @click="postComment"></svg-icon>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IUser} from '../../../../entity/user';
import {AuthStore} from '../../../../store/modules/Auth';
import {CommentsForm} from '../../../../form/comments/commentsForm';

@Component
export default class CommentsFormComponent extends Vue {
  @Prop() readonly form!: CommentsForm;

  get user(): IUser | null {
    return AuthStore.user;
  }

  cancel(): void {
    this.form.author = '';
    this.form.commentId = null;
    this.form.message = '';
    this.form.showAnswersForm = false;
    this.form.showCommentsForm = false;
    this.form.answersIndex = null;
  }

  postComment(): void {
    if (!this.form.disabled) {
      this.$emit('postComment');
    }
  }

  randomColor(i: number): string {
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
.discussion-container {
  flex-wrap: nowrap;

  .message-field {
    background-color: #FFFFFF;
    border-radius: 5px;
    color: #000000;
    font-size: 14px;
    width: 100%;
    text-indent: 16px;
    border: 1px solid rgba(66, 109, 246, 0.12);
    .v-input__slot {
      background: transparent !important;
      &::after {
        display: none;
      }
      &::before {
        display: none;
      }
    }
    .v-text-field__slot {
      textarea {
        max-height: 196px;
        overflow: scroll;
      }
    }
  }
  .message-container-full {
    width: 100%;
  }
  .message {
    background-color: #FFFFFF;
    border-radius: 5px;
    color: #000000;
    font-size: 14px;
    width: 100%;
    text-indent: 16px;
    border: 1px solid rgba(66, 109, 246, 0.12);
    padding-top: 6px;
    padding-bottom: 6px;

    &::placeholder {
      color: #828282;
    }
  }

  .send-icon {
    width: 28px !important;
    height: 28px !important;
    margin-left: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    &.disabled-post {
      path {
        fill: #dbdbdb !important;
      }
    }
  }
  .respond {
    background: rgba(66, 109, 246, 0.12);
    padding: 4px 16px;
    border-radius: 8px;
    font-size: 12px;
    color: #060516;
    &__text {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 150px;
      span {
        color: #426DF6;
      }
    }
    &__action {
      color: #eb5757;
      cursor: pointer;
    }
  }
}
</style>
