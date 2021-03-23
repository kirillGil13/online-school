<template>
  <v-row no-gutters :class="['message-container d-flex flex-row align-start mt-2', form.author ? '' : 'pt-6']">
    <v-avatar size="36" class="mr-3">
      <v-img :src="user.photoLink" alt=""/>
    </v-avatar>
    <v-col class="pa-0 d-flex flex-row align-end">
      <div class="message-container-full">
        <div class="respond d-flex flex-row justify-space-between" v-if="form.author">
          <div class="respond__text">Ваш ответ <span>{{ form.author }}</span></div>
          <div class="respond__action" @click="cancel">Отменить</div>
        </div>
        <v-textarea
            v-on:keyup.enter="$emit('postComment')"
            v-model="form.message"
            dense
            auto-grow
            id="message"
            filled
            placeholder="Ваше сообщение"
            rows="1"
            hide-details
            class="message-field"
        ></v-textarea>
      </div>
      <div class="d-flex justify-center align-center mb-1">
        <svg-icon class="send-icon" name="Send" @click="$emit('postComment')"></svg-icon>
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

  get user(): IUser {
    return AuthStore.user;
  }

  cancel(): void {
    this.form.author = '';
    this.form.commentId = null;
    this.form.message = '';
  }
}
</script>

<style lang="scss">
.message-container {
  flex-wrap: nowrap;

  .message-field {
    background-color: #FFFFFF;
    border-radius: 5px;
    color: #000000;
    font-size: 14px;
    width: 100%;
    text-indent: 16px;
    border: 1px solid rgba(66, 109, 246, 0.12);
    max-height: 110px;
    overflow: scroll;
    .v-input__slot {
      background: transparent !important;
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
  }
  .respond {
    background: rgba(66, 109, 246, 0.12);
    padding: 4px 16px;
    border-radius: 8px;
    font-size: 12px;
    color: #060516;
    &__text {
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
