<template>
  <div>
    <div class="items-add-place">
      <div class="items-add-place-text">
        <div class="items-add-place-text__title d-flex">
          <v-checkbox class="ma-0 pa-0" hide-details v-model="newTask.checked" />
          <v-text-field
              class="ma-0 pa-0"
              hide-details
              v-model="taskToUpdate.name"
              placeholder="Название задачи"
          />
        </div>
        <div class="items-add-place-text__actions">
          <div class="items-add-place-text__set-items-add-place ml-8">
            <v-textarea
                ref="contentTextArea"
                no-resize
                id="message"
                placeholder="Заметки"
                rows="5"
                hide-details
                type="text"
                v-model="taskToUpdate.description"
            />
          </div>
          <div class="items-add-place-text__like-dislike d-flex pa-3">
            <div>
              <svg-icon
                  name="Picture_outline"
                  class="menu__icon"
                  height="24"
                  width="24"
                  style="cursor: pointer"
                  @click="activatorImages = true"
              />
            </div>
            <div>
              <svg-icon
                  name="Users_outline"
                  class="ml-4 mr-1 menu__icon"
                  height="24"
                  width="28"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :activator="activatorImages" :full-screen="$adaptive.isMobile" @activatorChange="activatorImagesChange">
      <template v-slot:content>
        <TodoTaskImages v-if="activatorImages" :task-to-update="taskToUpdate"/>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ITodoTask} from '../../../../entity/todo/todo.types';
import TodoTaskImages from '../todoTaskImages/TodoTaskImages.vue';
import Modal from '../../common/Modal.vue';
@Component({
  components: {Modal, TodoTaskImages}
})
export default class TaskInput extends Vue {
  @Prop() readonly taskToUpdate!: ITodoTask;
  @Prop() readonly newTask!: any;
  activatorImages = false;
  activatorCandidates = false;

  activatorImagesChange(act: boolean): void {
    this.activatorImages = act;
  }
}
</script>

<style lang="scss">
.items-add-place {
  margin-top: 12px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 12px;

  .items-add-place-text__title {
    font-weight: 500;
    font-size: 16px !important;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #828282;
    .v-input {
      .v-input__control {
        .v-input__slot {
          .v-text-field__slot {
            input {
              font-size: 16px !important;
              &::placeholder {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    .v-input--selection-controls__input {
      input {
        border-radius: 6px !important;
      }
    }
  }

  .items-add-place-text__like-dislike {
    justify-content: flex-end;
  }
  #message {
    &::placeholder {
      font-size: 14px !important;
    }
  }
}
</style>
