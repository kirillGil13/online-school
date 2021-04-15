<template>
  <div>
    <h2 class="discussion-title mt-6">Обсуждение</h2>
<!--todo-->
<!--    <v-row no-gutters>-->
<!--      <Button class="discussion-button with_icon">-->
<!--        <svg-icon class="mr-2" name="Ring"></svg-icon>-->
<!--        Подписаться-->
<!--      </Button>-->
<!--    </v-row>-->
    <CommentsFormComponent :form="form" v-on='$listeners' class="mt-5"/>
    <v-col class="mt-4 pa-0">
      <Comments v-for="(item, index) in comments" :key="index" :comment="item" v-on="$listeners" :class="[index !== 0 ? 'mt-8' : '']"/>
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

@Component({
  components: {Comments, CommentsFormComponent, Relation, Button}
})
export default class Discussion extends Vue {
  @Prop() readonly form!: CommentsForm;
  @Prop({required: true, default: []}) readonly comments!: IComments[];
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
