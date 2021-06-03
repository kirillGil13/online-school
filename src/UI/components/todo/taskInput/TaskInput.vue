<template>
    <div>
        <div class="items-add-place">
            <div class="items-add-place-text">
                <div class="items-add-place-text__title d-flex">
                    <v-checkbox class="ma-0 pa-0" hide-details v-model="itemToUpdateOrCreate().checked" />
                    <v-text-field
                        class="ma-0 pa-0"
                        hide-details
                        v-model="itemToUpdateOrCreate().name"
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
                            v-model="itemToUpdateOrCreate().description"
                        />
                    </div>
                    <div class="items-add-place-text__like-dislike d-flex pa-3">
                        <div>
                            <svg-icon
                                name="Calendar_Icon"
                                class="menu__icon"
                                height="27"
                                width="27"
                                style="cursor: pointer"
                                @click="activatorCallTime = true"
                            />
                        </div>
                        <div class="ml-4 d-flex flex-row" style="cursor: pointer;" @click="activatorImages = true">
                            <svg-icon
                                name="Picture_outline"
                                class="menu__icon mr-2"
                                :class="[itemToUpdateOrCreate().imagesLink.length !== 0 && 'active-icon']"
                                height="24"
                                width="24"
                            />
                            <div style="margin-top: 2px;" v-if="itemToUpdateOrCreate().imagesLink.length !== 0">{{'Вложения: ' + itemToUpdateOrCreate().imagesLink.length}}</div>
                        </div>
                        <div class="ml-4">
                            <svg-icon name="Users_outline" class=" mr-1 menu__icon" height="24" width="28" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal :activator="activatorImages" :without-tool-bar="!$adaptive.isMobile" tool-bar-title="" :full-screen="$adaptive.isMobile" @activatorChange="activatorImagesChange">
            <template v-slot:full-screen-content v-if="$adaptive.isMobile">
                <TodoTaskImages v-if="activatorImages" :images="itemToUpdateOrCreate().imagesLink" :id="itemToUpdateOrCreate().id" @handleImage="handleImage" @deleteImage="deleteImage"/>
            </template>
          <template v-slot:content v-else>
            <TodoTaskImages v-if="activatorImages" :images="itemToUpdateOrCreate().imagesLink" :id="itemToUpdateOrCreate().id" @handleImage="handleImage" @deleteImage="deleteImage"/>
          </template>
        </Modal>
        <Modal :activator="activatorCallTime" :full-screen="$adaptive.isMobile" @activatorChange="activatorChangeCallTime">
            <template v-slot:content>
                <v-date-picker
                  v-model="itemToUpdateOrCreate().doDate"
                  class="mt-4"
                  full-width
                ></v-date-picker>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ITodoTask } from '../../../../entity/todo/todo.types';
import TodoTaskImages from '../todoTaskImages/TodoTaskImages.vue';
import Modal from '../../common/Modal.vue';
import { Datetime } from 'vue-datetime';
import {PictureUploadStore} from '../../../../store/modules/PictureUpload';
import {IPictureUpload} from '../../../../entity/common/pictureUpload.types';
import {CandidatesStore} from '../../../../store/modules/Candidates';
@Component({
    components: { Modal, TodoTaskImages, Datetime },
})
export default class TaskInput extends Vue {
    @Prop() readonly taskToUpdate!: ITodoTask;
    @Prop() readonly newTask!: any;
    @Prop() readonly isNewTask?: boolean;
    activatorImages = false;
    activatorCandidates = false;
    activatorCallTime = false;


  get picture(): IPictureUpload | null {
    return PictureUploadStore.pictureUpload;
  }

    activatorImagesChange(act: boolean): void {
        this.activatorImages = act;
    }

    itemToUpdateOrCreate(): any {
        return this.isNewTask ? this.newTask : this.taskToUpdate;
    }

    activatorChangeCallTime(act: boolean): void {
        this.activatorCallTime = act;
    }

  deleteImage(image: string): void {
    this.itemToUpdateOrCreate().imagesLink.splice(this.itemToUpdateOrCreate().imagesLink.findIndex((item: string) => item === image)!, 1);
  }

  async handleImage(e: any, id: number): Promise<void> {
    const selectedImages = e.target.files;
    for (let i = 0; i < selectedImages.length; i++) {
      await PictureUploadStore.set({ file: selectedImages[i] });
      if (this.picture) {
        this.itemToUpdateOrCreate().imagesLink.push(this.picture.fullLink)
      }
    }
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
  .menu__icon {
    &.active-icon {
      path {
        fill: #426DF6;
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
