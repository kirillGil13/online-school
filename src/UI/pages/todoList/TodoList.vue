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
        <div class="d-flex todo__items" style="width: 100%"  @click.self="showTextArea = false">
            <div class="items-title">
                <svg-icon name="Star_big" style="width: 5%; height: 100%"/>
                <span class="title-text">Сегодня</span>
            </div>
            <div class="items-btn-add" @click="showTextArea = true">
                <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
                <span class="btn-add-text">Добавить задачу</span>
            </div>
            <div class="items-add-place" v-if="showTextArea">
                <!-- <form-group class="width" field="review" :form="form" show-custom-error > -->
                <div class="items-add-place-text">
                    <div class="items-add-place-text__title">
                        <v-checkbox v-model="todoTitle" class="mt-0 pt-0" />
                        <v-text-field class="mt-0 pt-0" type="text" placeholder="Название задачи"/>
                    </div>
                    <div class="items-add-place-text__actions">
                        <div class="items-add-place-text__set-items-add-place">
                            <v-textarea
                                ref="contentTextArea"
                                no-resize
                                id="message"
                                placeholder="Напишите текст отзыва, чтобы сохранить оценку"
                                rows="5"
                                hide-details
                                type="text"
                            />
                        </div>
                        <div class="items-add-place-text__like-dislike d-flex">
                            <div>
                                <svg-icon name="Picture_outline" class="menu__icon" height="24" width="24" />
                            </div>
                            <div>
                                <svg-icon name="Users_outline" class="ml-4  mr-1 menu__icon" height="24" width="28" />
                            </div>
                        </div>
                    </div>
                    <!-- <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div> -->
                </div>
                <!-- </form-group> -->
            </div>
            <div class="items-check-boxes">
                <v-checkbox v-model="checkbox" label="Задача очень важная"></v-checkbox>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FormGroup from '../../components/common/form/FormGroup.vue';
import Relation from '../../components/common/Relation.vue';
import Button from '@/UI/components/common/Button.vue';
import {ITabs} from '../../../entity/tabs/tabs.types';
import {TabsStore} from '../../../store/modules/Tabs';

@Component({
    components: {
        FormGroup,
        Relation,
        Button,
    },
})
export default class Candidates extends Vue {
    showTextArea = false;
    todoTitle = false;
    checkbox = false;

    get tabs(): ITabs[] {
        return TabsStore.todoTabs;
    }


    setComponent(component: string): void {
        console.log(component)
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
