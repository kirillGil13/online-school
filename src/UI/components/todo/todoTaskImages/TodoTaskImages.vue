<template>
<div class="pa-4 todo-task-images">
  <v-row no-gutters>
    <v-col cols="4" class="task-images-item">
      <div class="picture-upload d-flex flex-column align-center justify-center" @click="activateInput">
        <svg-icon name="Picture_outline" width="36" height="36"></svg-icon>
        <div class="link font-14 mt-2">Добавить фото</div>
        <input type="file" v-show="false" accept="image/*" id="upload-picture" @change="$emit('handleImage', $event)">
      </div>
    </v-col>
    <v-col v-for="(item, index) in taskToUpdate.imagesLink" :key="index" cols="4">
      <v-img :src="item" height="200" width="100%">
      </v-img>
    </v-col>
  </v-row>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ITodoTask} from '../../../../entity/todo/todo.types';

@Component
export default class TodoTaskImages extends Vue {
  @Prop() readonly taskToUpdate!: ITodoTask;

  activateInput(): void {
    document.getElementById('upload-picture')!.click();
  }
}
</script>

<style lang="scss">
.todo-task-images {
  .task-images-item {
    margin-right: 8px;
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
  .picture-upload {
    height: 200px;
    background: rgba(66, 109, 246, 0.12);
    border-radius: 8px;
    color: #426DF6;
    cursor: pointer;
    svg {
      path {
        fill: #426df6 !important;
      }
    }
  }
}
</style>
