<template>
  <div>
    <div class="d-flex justify-space-between flex-row align-end mt-6">
      <h2 class="discussion-title mt-0">Обсуждение</h2>
      <div class="discussion-action d-flex flex-row align-center">
        <Select class-name="select_content" :selects="selectsDiscussion" v-on="$listeners" :id=" form.lessonId">
          <template v-slot:act>
            {{selectsDiscussion.find(item => item.id === selectedId).name}}
            <v-icon color="#426DF6">mdi-chevron-down</v-icon>
          </template>
        </Select>
<!--        <TextSelect :selects="selectsDiscussion" v-on="$listeners">-->
<!--        </TextSelect>-->
      </div>
    </div>
    <CommentsFormComponent :form="form" v-on='$listeners' v-if="user.subscription.isActual !== null"/>
    <v-col class="mt-4 pa-0">
      <Comments :selects="selects" v-for="(item, index) in comments" :key="index" :comment="item" v-on="$listeners" :answers-form="answersForm"
                :class="[index !== 0 ? 'mt-8' : '']" :form="changeForm"/>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '../common/Button.vue';
import Relation from '../common/Relation.vue';
import {IComments} from '../../../entity/comments/comments.types';
import CommentsFormComponent from '../forms/commentsForm/CommentsFormComponent.vue';
import {CommentsForm} from '../../../form/comments/commentsForm';
import Comments from './comments/Comments.vue';
import {ISelect} from '../../../entity/select/select.types';
import {CommentsChangeForm} from '../../../form/commentsChange/commentsChangeForm';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';
import Select from '../common/Select.vue';
import TextSelect from '../common/TextSelect.vue';

@Component({
  components: {TextSelect, Select, Comments, CommentsFormComponent, Relation, Button}
})
export default class Discussion extends Vue {
  @Prop() readonly form!: CommentsForm;
  @Prop() readonly answersForm!: CommentsForm;
  @Prop({required: true, default: []}) readonly comments!: IComments[];
  @Prop() readonly changeForm!: CommentsChangeForm;
  @Prop() readonly selects!: ISelect[];
  @Prop() readonly selectedId!: number;
  @Prop() readonly selectsDiscussion!: ISelect[];

  get user(): IUser | null {
    return AuthStore.user;
  }
}
</script>

<style lang="scss">
.discussion-title {
  font-size: 18px;
}
.select_content {
  margin-top: 0px !important;
  border-radius: 12px !important;
  min-width: 190px !important;
  max-height: 296px !important;
}
.discussion-button {
  padding: 0;
  color: #5F739C !important;
  font-size: 12px;
  background: none;
  background-color: transparent !important;
  border: none;

  &:hover {
    box-shadow: none;
  }
}
.discussion-action {
  color: #426DF6;
  cursor: pointer;
}

</style>
