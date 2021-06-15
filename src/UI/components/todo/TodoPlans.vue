<template>
    <div class="d-flex todo__items" style="width: 100%">
        <div class="items-title">
            <svg-icon name="Plans" style="width: 28px; height: 28px" />
            <span class="title-text">Планы</span>
        </div>
        <div class="add-task">
            <div class="items-btn-add" style="padding-left: 10px" @click="showTextArea = true">
                <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
                <span class="btn-add-text">Добавить задачу</span>
            </div>
            <TaskInput
                v-if="showTextArea"
                :statuses="statuses"
                :candidates="candidates"
                :filters="filters"
                :tabId="3"
                :task-item="taskItem"
                :isNewTask="true"
                v-on="$listeners"
            />
        </div>
        <div v-click-outside="setTask">
            <draggable v-model="dates" handle=".til" tag="div" class="list-group" @unchoose="log">
                <div class="plans-items pl-4 til" v-for="(item, id) in dates" :key="id">
                    <div class="d-flex flex-column plans-item" style="width: 100%">
                        <div class="d-flex align-baseline" style="width: 100%">
                            <div class="plans-items__task-date">{{ getitemTaskText(item.date) }}</div>
                            <div class="plans-items__task-date-text">{{ getDayOfWeek(item.date) }}</div>
                        </div>
                        <div class="d-flex flex-column mt-7">
                            <draggable
                                @end="log"
                                :id="id"
                                :list="item.tasks"
                                class="list-items"
                                handle=".handle"
                                tag="div"
                                :group="{ name: 'item' }"
                            >
                                <template v-for="(item, key) in item.tasks">
                                    <div class="d-flex flex-column mt-2" :key="key">
                                        <div
                                            class="
                                                d-flex
                                                align-center
                                                justify-space-between
                                                handle
                                                task-item-container
                                                px-2
                                            "
                                            v-if="taskShowId !== item.id"
                                        >
                                            <div class="d-flex align-end">
                                                <v-checkbox
                                                    hide-details
                                                    class="mt-0 pt-0"
                                                    @click="setToJurnal(item.id)"
                                                    v-model="item.checked"
                                                />
                                                <span class="item-text" @click.self="setTaskShowid(item.id)">{{
                                                    item.name ? `${item.name}` : 'Новая задача'
                                                }}</span>
                                            </div>
                                            <div class="d-flex align-center">
                                                <v-btn
                                                    @click="deleteTask(item.id)"
                                                    style="background: none"
                                                    class="mt-0"
                                                    text
                                                    icon
                                                    color="red lighten-2"
                                                >
                                                    <svg-icon
                                                        name="Todo_delete"
                                                        class="ml-1 mr-1 menu__icon"
                                                        height="20"
                                                        width="24"
                                                    />
                                                </v-btn>
                                            </div>
                                        </div>
                                        <TaskInput
                                            v-else
                                            :task-item="taskItem"
                                            :tabId="3"
                                            :candidates="candidates"
                                            :filters="filters"
                                            :statuses="statuses"
                                            :isNewTask="false"
                                            v-on="$listeners"
                                        />
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { ITaskItem, ITaskStatus, ITaskToDate, ITodoTask } from '@/entity/todo/todo.types';
import draggable from 'vuedraggable';
import TaskInput from './taskInput/TaskInput.vue';
import { TodoStore } from '@/store/modules/Todo';
import { DAYS_WEEK, MONTHS, PARENTCLASSES } from '@/constants';
import { ICandidate } from '../../../entity/candidates';
import { IStatuses } from '../../../entity/statuses/statuses.types';
import Filters from '../../../entity/filters/filters';

@Component({
    components: { TaskInput, draggable },
})
export default class TodoPlans extends Vue {
    @Prop() readonly statusItem!: ITaskStatus;
    @Prop() readonly id!: number;
    @Prop() readonly taskById!: ITodoTask;
    @Prop() readonly activeTab!: number;
    @Prop() readonly candidates!: { [p: string]: ICandidate[] };
    @Prop() readonly statuses!: IStatuses[];
    @Prop() readonly filters!: Filters;
    activeNames: any;
    array = [...this.tasks];
    taskShowId: number | null = null;
    globalDefaultDays: string[] = [];
    showTextArea = false;
    checkbox = false;
    taskItem: ITaskItem = {
        name: '',
        checked: false,
        description: '',
        doDate: new Date().getTime(),
        imagesLink: [],
        candidateId: null,
        reminderTime: null,
        candidateName: '',
    };
    newTask = false;

    @Watch('id')
    onChangeComponent(): void {
        this.showTextArea = false;
        if (this.taskShowId) {
            this.taskShowId = null;
        }
        this.setTaskToNull();
    }


    @Watch('tasks', { immediate: false })
    onChangeTasks(val: any, oldVal: any): void {
        if (this.tasks.length !== 0) {
            if (val.length > oldVal.length && this.showTextArea) {
                this.newTask = true;
            }
        }
    }

    @Watch('showTextArea')
    onChangeShow(): void {
        if (!this.showTextArea) {
            this.tasks[0].hide = false;
            this.newTask = false;
        }
    }

    @Watch('taskShowId')
    async onChangeId(val: number | null, oldVal: number | null): Promise<void> {
        if (val) {
            const item =  this.tasks.find((el) => el.id === this.taskShowId)!;
            let doDate = this.tasks.find((el) => el.id === this.taskShowId)!.doDate;
            let time = this.tasks.find((el) => el.id === this.taskShowId)!.reminderTime;
            if (time) {
                const hours = Math.floor((time as number) / 60 / 60);
                const minuts = Math.floor((time as number) / 60) - hours * 60;
                time = `${hours}:${minuts < 10 ? `0${minuts}` : minuts}`;
            }
            if (doDate) {
                doDate = Number(doDate * 1000);
            }
            if (oldVal) {
                if (this.taskItem.doDate) {
                    await TodoStore.handleTasks({date: +this.taskItem.doDate!, category: this.statusItem.categoryId, checked: this.taskItem.checked, id: oldVal});
                }
            }
            this.taskItem = {
                name: item.name,
                checked: false,
                description: item.description,
                doDate: doDate ? doDate : null,
                imagesLink: item.imagesLink,
                reminderTime: time ? time : null,
                candidateId: item.candidate ? item.candidate.candidate_id : null,
                candidateName: item.candidate ? item.candidate.candidate_name : '',
            };
        } else {
            this.setTaskToNull();
        }
    }


    get currentDay(): string {
        return new Date().toISOString().substr(0, 10);
    }

    get dates(): ITaskToDate[] {
        const defaultDays: ITaskToDate[] = [];
        const defaultDaysNumber: string[] = [];
        for (let i = 1; i < 16; i++) {
            const date = Date.now();
            const tom = new Date(date);
            tom.setDate(tom.getDate() + i);

            const key = `${tom.getDate()}.${tom.getMonth() + 1}.${tom.getFullYear()}`;

            defaultDays.push({
                date: key,
                tasks: [],
            });

            this.globalDefaultDays.push(key);

            defaultDaysNumber.push(key);
        }

        this.tasks.forEach((task) => {
            const tasksDate = new Date(+task.doDate! * 1000);
            const taskDateStr = `${tasksDate.getDate()}.${tasksDate.getMonth() + 1}.${tasksDate.getFullYear()}`;

            if (task.reminderTime) {
                const hours = Math.floor((task.reminderTime as number) / 60 / 60);
                const minuts = Math.floor((task.reminderTime as number) / 60) - hours * 60;
                task.reminderTime = `${hours}:${minuts}`;
            }

            if (defaultDaysNumber!.includes(taskDateStr)) {
                const item = defaultDays.find((el) => el.date === taskDateStr);
                const idx = defaultDays.findIndex((el) => el.date === item!.date);

                defaultDays[idx].tasks.push(task);

                return;
            }

            if (
                defaultDays.some(
                    (el) => el.date.split('.')[1] === taskDateStr.split('.')[1] && !defaultDaysNumber.includes(el.date)
                )
            ) {
                const item = defaultDays.find(
                    (el) => el.date.split('.')[1] === taskDateStr.split('.')[1] && !defaultDaysNumber.includes(el.date)
                );

                const idx = defaultDays.findIndex((el) => el.date === item!.date);

                defaultDays[idx].tasks.push(task);
                return;
            } else {
                defaultDays.push({
                    date: taskDateStr,
                    tasks: [task],
                });

                return;
            }
        });

        return defaultDays
            .sort((a, b) => {
                if (a.date.split('.')[1] < b.date.split('.')[1]) {
                    return 1;
                } else {
                    return -1;
                }
            })
            .reverse();
    }

    get tasks(): ITodoTask[] {
        return TodoStore.todoTasks.map((el) => {
            if (this.id !== 6) {
                return {
                    ...el,
                    checked: false,
                };
            } else {
                return {
                    ...el,
                    checked: true,
                };
            }
        });
    }

    set tasks(value: ITodoTask[]) {
        TodoStore.setDraggableTasks(value);
    }

    log(e: any): void {
        const id = e.to.id;
        const dateArr = this.dates[id].date.split('.');
        const currentEl = this.tasks.find((el) => el.name === e.item.innerText);
        const strDate = `${dateArr[2]}-${Number(dateArr[1]) < 10 ? `0${dateArr[1]}` : dateArr[1]}-${dateArr[0]}`;
        const date = Date.parse(strDate) / 1000;
        let time = null;

        if (currentEl!.reminderTime && typeof currentEl!.reminderTime !== 'number') {
            time =
                Number((currentEl!.reminderTime! as string).split(':')[0]) * 3600 +
                Number((currentEl!.reminderTime! as string).split(':')[1]) * 60;
        }


        const el = {
            name: currentEl!.name,
            description: currentEl!.description,
            do_date: date,
            category_id: currentEl!.categoryId,
            images_link: currentEl!.imagesLink,
            candidate_id: currentEl!.candidate ? currentEl?.candidate.candidate_id : null,
            reminder_time: currentEl!.reminderTime ? time: null,
        };
        this.$emit('upDateTask', el, this.taskItem.checked, currentEl?.id);
    }

    setTaskToNull(): void {
        this.taskItem = {
            name: '',
            checked: false,
            description: '',
            doDate: this.currentDay,
            imagesLink: [],
            candidateId: null,
            candidateName: '',
        };
    }

    onMoveCallBack(evt: any, o: any): void {
        console.log(o);
        console.log(evt);
    }

    include(className: string): boolean {
        return PARENTCLASSES.includes(className);
    }

    getitemTaskText(date: string): string {
        const title = date.split('.');

        return this.globalDefaultDays.includes(date) ? `${title[0]}` : '';
    }

    getDayOfWeek(date: string): string {
        const title = date.split('.');
        const secondsToday = Date.now();
        const todayByRightFormat = new Date(secondsToday);
        const checkToday =
            date ===
            `${todayByRightFormat.getDate() + 1}.${
                todayByRightFormat.getMonth() + 1
            }.${todayByRightFormat.getFullYear()}`;

        if (checkToday) {
            return 'Завтра';
        }

        //@ts-ignore
        const numberDayWeek = new Date(title[2], title[1] - 1 <= 0 ? 0 : title[1] - 1, title[0]).getDay();

        return (todayByRightFormat.getMonth() + 1).toString() === title[1] && this.globalDefaultDays.includes(date)
            ? DAYS_WEEK[numberDayWeek]
            : MONTHS.find((el) => el.id.toString() === title[1])!.defaultValue;
    }

    setTaskById(id: number): void {
        this.$emit('setTaskById', id);
    }

    setTask(e: any): void {
        if (
            this.include(e.target.classList[0]) &&
            e.target.classList[0] !== 'add-task' &&
            e.target.classList[0] !== 'v-dialog__content' &&
            (this.showTextArea || this.taskShowId)
        ) {
            if (this.showTextArea === true) {
                let time = null;

                if (this.taskItem.reminderTime && typeof this.taskItem.reminderTime !== 'number') {
                    time =
                        Number((this.taskItem.reminderTime! as string).split(':')[0]) * 3600 +
                        Number((this.taskItem.reminderTime! as string).split(':')[1]) * 60;
                }

                if (typeof this.taskItem.doDate === 'string') {
                    const parseDate = Date.parse(this.taskItem.doDate);
                    this.taskItem.doDate = parseDate;
                }

                const el = {
                    name: this.taskItem.name || null,
                    do_date: this.taskItem.doDate ? Math.floor((this.taskItem.doDate as number) / 1000) : null,
                    description: this.taskItem.description || null,
                    category_id: this.taskItem.checked ? 6 : this.statusItem.categoryId,
                    reminder_time: this.taskItem.reminderTime ? time : null,
                    images_link: this.taskItem.imagesLink.length === 0 ? null : this.taskItem.imagesLink,
                    candidate_id: this.taskItem.candidateId ? this.taskItem.candidateId : null,
                };
                this.$emit('createTask', el, this.taskItem.checked);
                this.showTextArea = false;
                this.setTaskToNull();
            } else {
                this.setTaskShowid(null);
            }
        }
    }

    setTaskShowid(id: number | null): void {
        if (this.taskShowId === id || id === null) {
            if (this.taskItem !== null) {
                let time = null;
                if (this.taskItem.reminderTime && typeof this.taskItem.reminderTime !== 'number') {
                    time =
                        Number((this.taskItem.reminderTime! as string).split(':')[0]) * 3600 +
                        Number((this.taskItem.reminderTime! as string).split(':')[1]) * 60;
                }
                const el = {
                    name: this.taskItem.name,
                    description: this.taskItem.description,
                    do_date: this.taskItem.doDate ? Math.floor((this.taskItem.doDate as number) / 1000) : null,
                    category_id: this.taskItem.checked ? 6 : this.statusItem.categoryId,
                    images_link: this.taskItem.imagesLink,
                    candidate_id: this.taskItem.candidateId ? this.taskItem.candidateId : null,
                    reminder_time: this.taskItem.reminderTime ? time : null,
                };

                this.$emit('upDateTask', el, this.taskItem.checked, this.taskShowId!);
                this.taskShowId = null;
            } else {
                this.taskShowId = null;
            }
        } else {
            this.taskShowId = id;
            this.setTaskById(id);
        }
    }

    deleteTask(id: number): void {
        this.$emit('deleteTask', id);
    }

    setToJurnal(id: number): void {
        const item = this.tasks.find((el) => el.id === id);
        const el = {
            name: item!.name,
            description: item!.description,
            category_id: 6,
        };
        this.$emit('toJurnalOrIncome', el, id);
        this.taskShowId = null;
    }
    updateTask(id: number): void {
        let time = null;
        if (this.taskItem.reminderTime && typeof this.taskItem.reminderTime !== 'number') {
            time =
                Number((this.taskItem.reminderTime! as string).split(':')[0]) * 3600 +
                Number((this.taskItem.reminderTime! as string).split(':')[1]) * 60;
        }
        const el = {
            name: this.taskItem.name,
            description: this.taskItem.description,
            do_date: this.taskItem.doDate ? Math.floor((this.taskItem.doDate as number) / 1000) : null,
            category_id: this.statusItem.categoryId,
            images_link: this.taskItem.imagesLink,
            reminder_time: this.taskItem.reminderTime ? time : null,
            candidate_id: this.taskItem.candidateId ? this.taskItem.candidateId : null,
        };
        if (this.statusItem.categoryId !== 2) {
            el.do_date = null;
        }
        this.$emit('upDateTask', el, this.taskItem.checked, id, this.newTask);
    }

    closeTask(e: any): void {
        if (
            this.include(e.target.classList[0]) &&
            e.target.classList[0] !== 'add-task' &&
            e.target.classList[0] !== 'v-dialog__content' &&
            (this.showTextArea || this.taskShowId)
        ) {
            this.showTextArea = false;
            if (this.taskShowId) {
                TodoStore.handleTasks({date: +this.taskItem.doDate!, category: this.statusItem.categoryId, checked: this.taskItem.checked, id: this.taskShowId!});
                this.taskShowId = null;
            }
            this.setTaskToNull();
        }
    }
}
</script>


<style lang="scss" scoped>
.plans-items {
    width: 100%;
    padding-left: 8px;
    margin-top: 33px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    flex-direction: column;

    .plans-item {
        margin-top: 26px;

        &:nth-child(1) {
            margin-top: 0px !important;
        }
    }

    &__task-date {
        font-weight: bold;
        font-weight: bold;
        font-size: 36px;
        color: #060516;
    }

    &__task-date-text {
        width: 100%;
        margin-left: 4px;
        border-top: 1px solid rgba(66, 109, 246, 0.12);
        font-size: 16px;
        color: #5f739c;
    }

    &__task-text {
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #101010;
    }
}
.task-item-container:hover {
    background: #f2f2f2;
    border-radius: 12px;
}
</style>
