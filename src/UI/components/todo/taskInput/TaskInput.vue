<template>
    <div>
        <div class="items-add-place">
            <div class="items-add-place-text">
                <div class="items-add-place-text__title d-flex">
                    <v-checkbox class="ma-0 pa-0" hide-details v-model="taskItem.checked" />
                    <v-text-field
                        class="ma-0 pa-0"
                        hide-details
                        v-model="taskItem.name"
                        @change="$emit('setTask')"
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
                            @change="$emit('setTask')"
                            v-model="taskItem.description"
                        />
                    </div>
                    <div class="items-add-place-text__like-dislike d-flex pa-3">
                        <div
                            v-if="![1, 4, 5,6].includes(tabId)"
                            class="d-flex align-center"
                            style="width: 100%; justify-self: flex-start"
                        >
                            <div class="d-flex align-center shortDate" @click="activatorDate = true">
                                <div class="d-flex align-center mr-3">
                                    <svg-icon
                                        :name="getIconName(tabId)"
                                        class="menu__icon"
                                        height="24"
                                        width="24"
                                        style="cursor: pointer"
                                    />
                                </div>
                                <div class="d-flex align-center" v-if="tabId === 3">
                                    {{ shortDaysOfWeek(taskItem.doDate) }}
                                </div>
                            </div>
                            <div class="d-flex align-center ml-2" @click="activatorTime = true">Напомнить</div>
                        </div>
                        <div v-if="![1, 4, 5,6].includes(tabId)" class="d-flex">
                            <svg-icon
                                name="Calendar_Icon"
                                class="menu__icon"
                                height="27"
                                width="27"
                                style="cursor: pointer"
                                @click="activatorDate = true"
                            />
                        </div>
                        <div
                            class="ml-4 d-flex align-center flex-row"
                            style="cursor: pointer"
                            @click="activatorImages = true"
                        >
                            <svg-icon
                                name="Picture_outline"
                                class="menu__icon"
                                :class="[taskItem.imagesLink.length !== 0 && taskItem.imagesLink && 'active-icon mr-2']"
                                height="24"
                                width="24"
                            />
                            <div
                                style="margin-top: 3px; white-space: nowrap"
                                v-if="taskItem.imagesLink.length !== 0 && taskItem.imagesLink"
                            >
                                {{ 'Вложения: ' + taskItem.imagesLink.length }}
                            </div>
                        </div>
                        <div
                            class="ml-4 d-flex flex-row align-center"
                            style="cursor: pointer; white-space: nowrap"
                            @click="activatorCandidates = true"
                        >
                            <svg-icon
                                name="Users_outline"
                                class="menu__icon"
                                :class="[taskItem.candidateId && 'active-icon mr-2']"
                                height="24"
                                width="28"
                            />
                            <div style="margin-top: 2px" v-if="taskItem.candidateId">
                                {{ taskItem.candidateName }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            :width="'max-content'"
            :full-screen="$adaptive.isMobile"
            @activatorChange="activatorChangeTime"
            :activator="activatorTime"
        >
            <template v-slot:content>
                <v-time-picker v-model="taskItem.reminderTime" format="24hr" />
            </template>
        </Modal>

        <Modal
            :activator="activatorImages"
            :without-tool-bar="!$adaptive.isMobile"
            tool-bar-title=""
            :full-screen="$adaptive.isMobile"
            @activatorChange="activatorImagesChange"
        >
            <template v-slot:full-screen-content v-if="$adaptive.isMobile">
                <TodoTaskImages
                    v-if="activatorImages"
                    :images="taskItem.imagesLink"
                    @handleImage="handleImage"
                    @deleteImage="deleteImage"
                />
            </template>
            <template v-slot:content v-else>
                <TodoTaskImages
                    v-if="activatorImages"
                    :images="taskItem.imagesLink"
                    @handleImage="handleImage"
                    @deleteImage="deleteImage"
                />
            </template>
        </Modal>
        <Modal
            :width="'max-content'"
            :activator="activatorDate"
            :full-screen="$adaptive.isMobile"
            @activatorChange="activatorChangeDate"
        >
            <template v-slot:content>
                <v-date-picker
                    header-color="#426df6"
                    color="#426df6"
                    v-model="taskDate"
                    full-width
                    flat
                    show-adjacent-months
                    elevation="15"
                    min="2016-06-15"
                    max="2023-03-20"
                    year-icon="mdi-calendar-blank"
                    prev-icon="mdi-skip-previous"
                    next-icon="mdi-skip-next"
                ></v-date-picker>
            </template>
        </Modal>
        <Modal
            :activator="activatorCandidates"
            :without-tool-bar="false"
            tool-bar-title="Выберите исполнителя"
            :full-screen="true"
            @activatorChange="activatorCandidatesChange"
        >
            <template v-slot:full-screen-content v-if="activatorCandidates">
                <div>
                    <v-row justify="center" :no-gutters="$adaptive.isMobile">
                        <v-col
                            class="mt-6"
                            :class="$adaptive.isMobile && 'px-3'"
                            style="max-width: 1600px; width: 100%"
                        >
                            <FilterComponent
                                :isCandidates="false"
                                :isOnRight="!$adaptive.isMobile"
                                :is-archive="false"
                                :button="false"
                                :search="true"
                                :count-element="$adaptive.isMobile ? [1, 2] : [2]"
                                :filters="filters"
                                v-on="$listeners"
                            >
                                <template v-slot:search>
                                    <Search v-on="$listeners" />
                                </template>
                            </FilterComponent>
                        </v-col>
                    </v-row>
                    <v-row class="mt-3" justify="center" no-gutters>
                        <div class="mb-6 px-3" style="max-width: 1600px; width: 100%">
                            <TableCandidates
                                task
                                :candidates="candidates"
                                :statuses="statuses"
                                @choseCandidate="chooseCandidate"
                            />
                        </div>
                    </v-row>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ITaskItem } from '../../../../entity/todo/todo.types';
import TodoTaskImages from '../todoTaskImages/TodoTaskImages.vue';
import Modal from '../../common/Modal.vue';
import { Datetime } from 'vue-datetime';
import { PictureUploadStore } from '../../../../store/modules/PictureUpload';
import { IPictureUpload } from '../../../../entity/common/pictureUpload.types';
import { ICandidate } from '../../../../entity/candidates';
import { IStatuses } from '../../../../entity/statuses/statuses.types';
import TableCandidates from '../../tables/TableCandidates.vue';
import FilterComponent from '../../filter/FilterComponent.vue';
import Filters from '../../../../entity/filters/filters';
import { MONTHS, SHORT_DAYS_WEEK, TODOCOMPONENTS } from '@/constants';
import Search from '../../common/Search.vue';

@Component({
    components: { FilterComponent, TableCandidates, Modal, TodoTaskImages, Datetime, Search },
})
export default class TaskInput extends Vue {
    @Prop() readonly taskItem!: ITaskItem;
    @Prop() readonly tabId?: number;
    @Prop() readonly candidates!: { [p: string]: ICandidate[] };
    @Prop() readonly statuses!: IStatuses[];
    @Prop() readonly filters!: Filters;
    activatorImages = false;
    activatorCandidates = false;
    activatorDate = false;
    activatorTime = false;
    picker = null;

    get picture(): IPictureUpload | null {
        return PictureUploadStore.pictureUpload;
    }

    get taskDate(): string {
        return new Date(this.taskItem.doDate!).toISOString().substr(0, 10);
    }

    set taskDate(date: string) {
        this.taskItem.doDate = Date.parse(date);
        
    }


    getIconName(id: number): string {
        return TODOCOMPONENTS.find((el) => el.id === id)!.iconName;
    }

    shortDaysOfWeek(date: string): string {
      
        const dateFormat = new Date(date!).toISOString().substr(0, 10);
        const title: string[] = dateFormat.split('-');
        const day = new Date(
            Number(title[0]),
            Number(title[1]) - 1 <= 0 ? 0 : Number(title[1]) - 1,
            Number(title[2])
        ).getDay();
        const dateStr = `${SHORT_DAYS_WEEK[day]}, ${title[2]} ${
            MONTHS.find((el) => title[1].includes(el.id.toString()))!.value
        }`;
        return dateStr;
    }

    activatorImagesChange(act: boolean): void {
        this.activatorImages = act;
        if (!act) {
          this.$emit('setTask');
        }
    }

    activatorChangeDate(act: boolean): void {
        this.activatorDate = act;

         if (!act) {
        this.$emit('setTask');
      }
    }

    activatorChangeTime(act: boolean): void {
        this.activatorTime = act;

    }


    activatorCandidatesChange(act: boolean): void {
        this.activatorCandidates = act;
    }

    deleteImage(image: string): void {
        this.taskItem.imagesLink.splice(this.taskItem.imagesLink.findIndex((item: string) => item === image)!, 1);
    }

    chooseCandidate(id: number): void {
        this.taskItem.candidateId = Object.values(this.candidates)
            .flat()
            .find((el) => el.id === id)!.id;
        this.taskItem.candidateName = Object.values(this.candidates)
            .flat()
            .find((el) => el.id === id)!.name;
        this.activatorCandidates = false;
        this.$emit('setTask');
    }

    async handleImage(e: any): Promise<void> {
        const selectedImages = e.target.files;
        for (let i = 0; i < selectedImages.length; i++) {
            await PictureUploadStore.set({ file: selectedImages[i] });
            if (this.picture) {
                this.taskItem.imagesLink.push(this.picture.fullLink);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
        align-items: end;
    }
    #message {
        &::placeholder {
            font-size: 14px !important;
        }
    }

    .shortDate {
        cursor: pointer;
        padding: 1px;

        &:hover {
            border: 1px solid black;
            border-radius: 5px;
        }
    }
}
</style>
