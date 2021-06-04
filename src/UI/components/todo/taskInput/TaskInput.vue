<template>
    <div>
        <div class="items-add-place">
            <div class="items-add-place-text">
                <div class="items-add-place-text__title d-flex">
                    <v-checkbox class="ma-0 pa-0" hide-details v-model="itemToUpdateOrCreate().task.checked" />
                    <v-text-field
                        class="ma-0 pa-0"
                        hide-details
                        v-model="itemToUpdateOrCreate().task.name"
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
                            v-model="itemToUpdateOrCreate().task.description"
                        />
                    </div>
                    <div class="items-add-place-text__like-dislike d-flex pa-3">
                        <div v-if="![1,4,5].includes(tabId)">
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
                                class="menu__icon"
                                :class="[itemToUpdateOrCreate().task.imagesLink.length !== 0 && 'active-icon mr-2']"
                                height="24"
                                width="24"
                            />
                            <div style="margin-top: 3px;" v-if="itemToUpdateOrCreate().task.imagesLink.length !== 0">{{'Вложения: ' + itemToUpdateOrCreate().task.imagesLink.length}}</div>
                        </div>
                        <div class="ml-4 d-flex flex-row" style="cursor: pointer;" @click="activatorCandidates = true">
                            <svg-icon
                                name="Users_outline"
                                class="menu__icon"
                                :class="[itemToUpdateOrCreate().candidate && 'active-icon mr-2']"
                                height="24"
                                width="28"
                            />
                            <div style="margin-top: 2px;" v-if="itemToUpdateOrCreate().candidate">{{itemToUpdateOrCreate().candidate}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal :activator="activatorImages" :without-tool-bar="!$adaptive.isMobile" tool-bar-title="" :full-screen="$adaptive.isMobile" @activatorChange="activatorImagesChange">
            <template v-slot:full-screen-content v-if="$adaptive.isMobile">
                <TodoTaskImages v-if="activatorImages" :images="itemToUpdateOrCreate().task.imagesLink" :id="itemToUpdateOrCreate().task.id" @handleImage="handleImage" @deleteImage="deleteImage"/>
            </template>
          <template v-slot:content v-else>
            <TodoTaskImages v-if="activatorImages" :images="itemToUpdateOrCreate().task.imagesLink" :id="itemToUpdateOrCreate().task.id" @handleImage="handleImage" @deleteImage="deleteImage"/>
          </template>
        </Modal>
        <Modal :activator="activatorCallTime" :full-screen="$adaptive.isMobile" @activatorChange="activatorChangeCallTime">
            <template v-slot:content>
                <v-date-picker
                  v-model="itemToUpdateOrCreate().task.doDate"
                  class="mt-4"
                  full-width
                ></v-date-picker>
            </template>
        </Modal>
      <Modal :activator="activatorCandidates" :without-tool-bar="false" tool-bar-title="Выберите исполнителя" :full-screen="true" @activatorChange="activatorCandidatesChange">
        <template v-slot:full-screen-content v-if="activatorCandidates">
          <v-row justify="center" style="background: #fbfcfe" no-gutters>
            <div class="mb-6 px-3" style="max-width: 1600px; width: 100%">
              <TableCandidates :candidates="candidates" :statuses="statuses"
                               @choseCandidate="chooseCandidate"/>
            </div>
          </v-row>
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
import {ICandidate} from '../../../../entity/candidates';
import {IStatuses} from '../../../../entity/statuses/statuses.types';
import TableCandidates from '../../tables/TableCandidates.vue';
@Component({
    components: {TableCandidates, Modal, TodoTaskImages, Datetime },
})
export default class TaskInput extends Vue {
    @Prop() readonly taskToUpdate!: ITodoTask;
    @Prop() readonly newTask!: any;
    @Prop() readonly isNewTask?: boolean;
    @Prop() readonly tabId?: number;
    @Prop() readonly candidates!: {[p: string]: ICandidate[]};
    @Prop() readonly statuses!: IStatuses[];
    activatorImages = false;
    activatorCandidates = false;
    activatorCallTime = false;

    get picture(): IPictureUpload | null {
        return PictureUploadStore.pictureUpload;
    }

    activatorImagesChange(act: boolean): void {
        this.activatorImages = act;
    }

    itemToUpdateOrCreate(): {task: any; candidate: string | null} {
        const task = this.isNewTask ? this.newTask : this.taskToUpdate;
        let candidate = null;
        if (this.isNewTask) {
          if (task.candidateId) {
            candidate = Object.values(this.candidates).flat().find(el => el.id === task.candidateId)!.name;
          }
        } else {
          if (task.candidate) {
            candidate = task.candidate.candidate_name;
          }
        }
        return {task, candidate};
    }

    activatorChangeCallTime(act: boolean): void {
        this.activatorCallTime = act;
    }

  activatorCandidatesChange(act: boolean): void {
        this.activatorCandidates = act;
    }

  deleteImage(image: string): void {
    this.itemToUpdateOrCreate().task.imagesLink.splice(this.itemToUpdateOrCreate().task.imagesLink.findIndex((item: string) => item === image)!, 1);
  }

  chooseCandidate(id: number): void {
    if (this.isNewTask) {
      this.itemToUpdateOrCreate().task.candidateId = Object.values(this.candidates).flat().find(el => el.id === id)!.id;
    } else {
      this.itemToUpdateOrCreate().task.candidate = {
        candidate_id: Object.values(this.candidates).flat().find(el => el.id === id)!.id,
        candidate_name: Object.values(this.candidates).flat().find(el => el.id === id)!.name
      }
    }
    this.activatorCandidates = false;
  }

  async handleImage(e: any, id: number): Promise<void> {
    const selectedImages = e.target.files;
    for (let i = 0; i < selectedImages.length; i++) {
      await PictureUploadStore.set({ file: selectedImages[i] });
      if (this.picture) {
        this.itemToUpdateOrCreate().task.imagesLink.push(this.picture.fullLink)
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
                fill: #426df6;
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
