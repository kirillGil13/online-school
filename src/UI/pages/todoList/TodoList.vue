<template>
    <div class="todo">
        <div class="todo__menu">
            <v-list :collapse-transition="false" style="background: none" nav rounded dense>
                <template v-for="item in tabs">
                    <v-list-item
                        :id="item.id"
                        color=""
                        :key="item.title"
                        :ripple="!$adaptive.isMobile"
                        @click="setComponent(item.component)"
                        exact
                        exact-active-class="active-menu"
                    >
                        <v-list-item-icon>
                            <svg-icon :name="item.iconName" class="menu__icon" height="24" width="24" />
                        </v-list-item-icon>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item>
                </template>
            </v-list>
        </div>
        <keep-alive>
            <component
                :is="activeComponent"
                style="margin-right: 2px; margin-left: 2px;"
            />
         </keep-alive>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormGroup from '../../components/common/form/FormGroup.vue';
import Relation from '../../components/common/Relation.vue';
import Button from '@/UI/components/common/Button.vue';
import {ITabs} from '../../../entity/tabs/tabs.types';
import {TabsStore} from '../../../store/modules/Tabs';
import TodoIncome from '@/UI/components/todo/TodoIncome.vue';
import TodoAnyTimes from '@/UI/components/todo/TodoAnyTimes.vue';
import TodoJournal from '@/UI/components/todo/TodoJournal.vue';
import TodoPlans from '@/UI/components/todo/TodoPlans.vue';
import TodoSomeDay from '@/UI/components/todo/TodoSomeDay.vue';
import TodoToday from '@/UI/components/todo/TodoToday.vue';



@Component({
    components: {
        FormGroup,
        Relation,
        Button,
        TodoPlans,
        TodoSomeDay,
        TodoIncome,
        TodoToday,
        TodoAnyTimes,
        TodoJournal
    },
})
export default class Candidates extends Vue {
    showTextArea = false;
    todoTitle = false;
    checkbox = false;
    activeComponent = 'TodoToday';

    get tabs(): ITabs[] {
        return TabsStore.todoTabs;
    }


    setComponent(component: string): void {
        this.activeComponent = component;
    }
   
}
</script>

<style lang="scss">
.todo {
    background: none !important;
    display: flex;
    height: 100%;

    &__items {
        flex-direction: column;
        margin-left: 48px;
        height: 100%;

        .items-title {
            display: flex;
            align-items: center;

            .title-text {
                font-weight: bold;
                font-size: 36px;
                color: #101010;
                margin-left: 16px;
            }
        }

        

        .items-btn-add {
            padding-left: 8px;
            margin-top: 36px;
            display: flex;
            align-items: center;
            cursor: pointer;
            max-width: max-content;

            .items-icon-plus {
                border: 2px solid #426DF6;
                border-radius: 5px;
            }

            .btn-add-text {
                margin-left: 14px;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                color: #426df6;
            }
        }

        .items-add-place {
            margin-top: 12px;
            background: #ffffff;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08);
            border-radius: 12px;
            padding: 14px;

            .items-add-place-text__title {
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                display: flex;
                align-items: center;
                color: #828282;
            }

            .items-add-place-text__like-dislike {
                justify-content: flex-end;
            }
        }

        .items-check-boxes {
            display: flex;
            flex-direction: column;
            padding-left: 7px;
        }
    }

    .v-text-field > .v-input__control > .v-input__slot:after {
        border: none !important;
    }

    .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
        border: none !important;
    }

    .v-list--nav .v-list-item:not(:last-child):not(:only-child), .v-list--rounded .v-list-item:not(:last-child):not(:only-child) {
        margin-bottom: 0;
    }

    #income {
        margin-bottom: 16px;
    }

    #journal { 
        margin-top: 16px;
    }

    .v-list-item--dense .v-list-item__title, .v-list-item--dense .v-list-item__subtitle, .v-list--dense .v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle {
        font-size: 16px;
    }
}
</style>
