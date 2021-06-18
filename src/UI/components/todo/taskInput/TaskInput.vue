<template>
    <div :class="[$adaptive.isMobile && 'px-1']">
        <div class="items-add-place">
            <div class="items-add-place-text">
                <div class="items-add-place-text__title d-flex">
                    <v-checkbox class="ma-0 pa-0" hide-details v-model="taskItem.checked" @change="$emit('setChecked')" />
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
                            auto-grow
                            placeholder="Заметки"
                            :rows="$adaptive.isMobile ? 2 : 5"
                            hide-details
                            type="text"
                            @change="$emit('setTask')"
                            v-model="taskItem.description"
                        />
                    </div>
                    <div class="items-add-place-text__like-dislike d-flex align-end pl-5 py-3 pr-3" v-if="taskItem.categoryId !== 6">
                        <div class="d-flex flex-column">
                            <div v-if="taskItem.doDate" class="d-flex align-center" style="width: 100%;">
                                <div class="d-flex action" @click="activatorDate = true">
                                        <svg-icon
                                            :name="taskDate !== dateNow ? getIconName(3) : getIconName(2)"
                                            class="menu__icon"
                                            height="20"
                                            width="24"
                                            style="cursor: pointer"
                                        />

                                    <div class="d-flex align-center ml-2" style="font-weight: 600;">
                                        {{taskItem.doDate ? shortDaysOfWeek(datePicker): tabId === 2 && 'Cегодня' }}
                                    </div>
                                    <div class="d-flex align-center destroy ml-2" :style="{opacity: $adaptive.isMobile && '1'}" @click.stop="refactorDate">
                                        <v-icon size="16">mdi-close</v-icon>
                                    </div>
                                </div>
                                <div class="d-flex align-center ml-2 task-time" style="color: #426df6;" @click="activatorTime = true">{{taskItem.reminderTime !== null && taskItem.reminderTime !== '0:0' ? taskItem.reminderTime : 'Напомнить'}}</div>
                            </div>
                            <div class="d-flex justify-start flex-row action" style="cursor: pointer;" @click="activatorImages = true" v-if="taskItem.imagesLink.length !== 0 && taskItem.imagesLink">
                                <svg-icon
                                    name="Picture_outline"
                                    class="menu__icon active-icon mr-2"
                                    height="20"
                                    width="24"
                                />
                                <div style="white-space: nowrap">
                                    {{ 'Вложения: ' + taskItem.imagesLink.length }}
                                </div>
                                <div class="destroy ml-2" :style="{opacity: $adaptive.isMobile && '1'}" @click.stop="refactorImage">
                                    <v-icon size="16">mdi-close</v-icon>
                                </div>
                            </div>
                            <div class="d-flex flex-row action" style="cursor: pointer; white-space: nowrap" @click="activatorCandidates = true" v-if="taskItem.candidateId">
                                <svg-icon
                                    name="Users_outline"
                                    class="menu__icon active-icon mr-2"
                                    height="20"
                                    width="24"
                                />
                                <div style="margin-top: 2px" >
                                    {{ taskItem.candidateName }}
                                </div>
                                <div class="destroy ml-2" :style="{opacity: $adaptive.isMobile && '1'}" @click.stop="refactorCand">
                                    <v-icon size="16">mdi-close</v-icon>
                                </div>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="d-flex flex-row">
                            <div  v-if="!taskItem.doDate">
                                <svg-icon
                                    name="Calendar_Icon"
                                    class="menu__icon"
                                    height="27"
                                    width="27"
                                    style="cursor: pointer"
                                    @click="activatorDate = true"
                                />
                            </div>
                            <div class="ml-4" style="cursor: pointer" @click="activatorImages = true" v-if="taskItem.imagesLink.length === 0 || !taskItem.imagesLink">
                                <svg-icon
                                    name="Picture_outline"
                                    class="menu__icon"
                                    height="24"
                                    width="24"
                                />
                            </div>
                            <div class="ml-4" style="cursor: pointer; white-space: nowrap" @click="activatorCandidates = true" v-if="!taskItem.candidateId">
                                <svg-icon
                                    name="Users_outline"
                                    class="menu__icon"
                                    height="24"
                                    width="28"
                                />
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
            :without-tool-bar="false"
            tool-bar-title=""
            :full-screen="true"
            custom-icon="mdi-check"
            @activatorChange="activatorImagesChange"
            :disabled="disabled"
            @close="closeImageModal"
        >
            <template v-slot:full-screen-content>
              <v-row justify="center" no-gutters>
                <v-col :class="['pt-0']" style="max-width: 1000px; width: 100%">
                  <TodoTaskImages
                      v-if="activatorImages"
                      :images="taskItem.imagesLink"
                      @handleImage="handleImage"
                      @deleteImage="deleteImage"
                  />
                </v-col>
              </v-row>
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
                    :min="dateNow"
                    :max="maxDate"
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
                    <v-row justify="center" no-gutters>
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
                        <div class="mb-6" :class="[$adaptive.isMobile && 'px-3']" style="max-width: 1600px; width: 100%">
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
        <Modal
            :width="'max-content'"
            :activator="activatorPlan"
            :full-screen="$adaptive.isMobile"
            @activatorChange="activatorPlanChangeDate"
        >
            <template v-slot:content>
                <div class="pa-6">
                    <h2 class="text-center">Задача переместится во входящие</h2>
                    <div class="d-flex" :class="[$adaptive.isMobile ? '' : 'flex-row']">
                        <Button small full-width class="secondary_blue" :class="[$adaptive.isMobile ? '' : 'mr-2']" @submit="abort">Отмена</Button>
                        <Button small full-width @submit="changeTask">Продолжить</Button>
                    </div>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
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
import Button from '../../common/Button.vue';

@Component({
    components: { Button, FilterComponent, TableCandidates, Modal, TodoTaskImages, Datetime, Search },
})
export default class TaskInput extends Vue {
    @Prop() readonly taskItem!: ITaskItem;
    @Prop() readonly tabId!: number;
    @Prop() readonly candidates!: { [p: string]: ICandidate[] };
    @Prop() readonly statuses!: IStatuses[];
    @Prop() readonly filters!: Filters;
    activatorImages = false;
    activatorCandidates = false;
    activatorDate = false;
    activatorTime = false;
    activatorPlan = false;
    picker = null;
    disabled = false;
    datePicker: string | number | null = null;

    constructor() {
        super();
        this.datePicker = this.taskItem.doDate;
        if ([1,4,5,6].indexOf(this.tabId) !== -1) {
            this.datePicker = Math.floor(new Date().getTime());
        }
    }

    @Watch('activatorImages')
    onActImChange(): void {
      if (!this.activatorImages) {
        this.$emit('setTask');
      }
    }

    @Watch('activatorDate')
    onActDateChange(): void {
      if (!this.activatorDate) {
        this.taskItem.doDate = this.datePicker;
        this.$emit('setDate');
      }
    }

    @Watch('activatorTime')
    onActTimeChange(): void {
      if (!this.activatorTime) {
        this.$emit('setTask');
      }
    }

    get picture(): IPictureUpload | null {
        return PictureUploadStore.pictureUpload;
    }

    get taskDate(): string {
        return new Date((this.datePicker as number)).toISOString().substr(0, 10);
    }

    set taskDate(date: string) {
        this.datePicker = Date.parse(date);
    }

    get dateNow(): string {
        return (new Date()).toISOString().slice(0,10);
    }

    get dateTomorrow(): string {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const temp = new Date(date);
        return temp.toISOString().slice(0,10);
    }

    get maxDate(): string {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        const temp = new Date(date);
        return temp.toISOString().slice(0,10);
    }

    abort(): void {
        this.activatorPlan = false;
    }

    changeTask(): void {
        this.taskItem.doDate = null;
        this.$emit('changeTask');
    }


    closeImageModal(): void {
        this.activatorImages = false;
    }

    getIconName(id: number): string {
        return TODOCOMPONENTS.find((el) => el.id === id)!.iconName;
    }

    shortDaysOfWeek(date: string): string {
        const dateFormat = new Date(date!).toISOString().substr(0, 10);
        const now = new Date(Date.now()).toISOString().substr(0, 10);
        if (now  === dateFormat) {
          return 'Сегодня';
        } else {
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
    }

    activatorImagesChange(act: boolean): void {
        this.activatorImages = act;
    }

    activatorChangeDate(act: boolean): void {
        this.activatorDate = act;
    }

    activatorChangeTime(act: boolean): void {
        this.activatorTime = act;

    }
    activatorPlanChangeDate(act: boolean): void {
        this.activatorPlan = act;

    }

    activatorCandidatesChange(act: boolean): void {
        this.activatorCandidates = act;
    }

    deleteImage(image: string): void {
        this.taskItem.imagesLink.splice(this.taskItem.imagesLink.findIndex((item: string) => item === image)!, 1);
    }

    showReminderTime(el: string): string {
      console.log(el)
      return 'hello'
    }

    refactorDate(): void {
        if (this.tabId !== 3) {
            this.taskItem.doDate = null;
            this.$emit('setDate', true);
        }else {
            this.activatorPlan = true;
        }
    }

    refactorCand(): void {
        this.taskItem.candidateId = null;
        this.$emit('setTask');
    }

    refactorImage(): void {
        this.taskItem.imagesLink = [];
        this.$emit('setTask');
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
        this.disabled = true;
        const selectedImages = e.target.files;
        for (let i = 0; i < selectedImages.length; i++) {
            this.taskItem.imagesLink.push('');
        }
        for (let i = 0; i < selectedImages.length; i++) {
            await PictureUploadStore.set({ file: selectedImages[i] });
            if (this.picture) {
                this.taskItem.imagesLink.splice(this.taskItem.imagesLink.indexOf(''), 1);
                this.taskItem.imagesLink.push(this.picture.fullLink);
            }
            if (i + 1 === selectedImages.length)
                this.disabled = false;
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
                        input {
                            font-size: 16px !important;
                            &::placeholder {
                                font-size: 16px !important;
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
    }
    #message {
        &::placeholder {
            font-size: 14px !important;
        }
    }

    .task-time {
      cursor: pointer;
    }

    .action {
        cursor: pointer;
        transition: all .3s ease;
        width: max-content !important;
        padding: 6px 12px;
        .destroy {
            opacity: 0;
            transition: opacity ease 200ms, visibility ease 200ms;
        }
        &:hover {
            background: #F2F2F2;
            border-radius: 6px;
            .destroy {
                opacity: 1;
            }
        }
    }
  .v-text-field > .v-input__control > .v-input__slot:before, .v-text-field > .v-input__control > .v-input__slot:after {
    content: none !important;
  }
}
</style>
