<template>
  <div>
    <h2 class="discussion-title mt-6">Обсуждение</h2>
    <CommentsFormComponent :form="form" v-on='$listeners'/>
    <v-col class="mt-4 pa-0">
      <Comments :selects="selects" v-for="(item, index) in comments" :key="index" :comment="item" v-on="$listeners"
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

@Component({
  components: {Comments, CommentsFormComponent, Relation, Button}
})
export default class Discussion extends Vue {
  @Prop() readonly form!: CommentsForm;
  @Prop({required: true, default: []}) readonly comments!: IComments[];
  @Prop() readonly changeForm!: CommentsChangeForm;
  @Prop() readonly selects!: ISelect[];
}
</script>

<style lang="scss">
.discussion-title {
  font-size: 18px;
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

</style>
