<template>
    <div class="todo">
        <div class="todo__menu">
            <v-list :collapse-transition="false" style="background: none" nav rounded>
                <template v-for="item in items">
                    <v-list-item
                        :id="item.id"
                        color=""
                        :key="item.title"
                        :ripple="!$adaptive.isMobile"
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
        <div class="d-flex todo__items" style="width: 100%">
            <div class="items-title">
                <svg-icon name="Star_big" style="width: 5%; height: 100%"/>
                <span class="title-text">Сегодня</span>
            </div>
            <div class="items-btn-add">
                <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
                <span class="btn-add-text">Добавить задачу</span>
            </div>
            <div class="items-add-place">
                <!-- <form-group class="width" field="review" :form="form" show-custom-error > -->
                <div class="items-add-place-text">
                    <div class="items-add-place-text__title">Название задачи</div>
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
                                <v-icon>mdi-image</v-icon>
                            </div>
                            <div>
                                <v-icon class="ml-4">mdi-account-multiple</v-icon>
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

@Component({
    components: {
        FormGroup,
        Relation,
        Button,
    },
})
export default class Candidates extends Vue {
    items = [
        { id: Date.now(), title: 'Входящие', iconName: 'Income' },
        { id: Date.now(), title: 'Сегодня', iconName: 'Star_small' },
        { id: Date.now(), title: 'Планы', iconName: 'Plans' },
        { id: Date.now(), title: 'В любое время', iconName: 'Any_times' },
        { id: Date.now(), title: 'Когда-нибудь', iconName: 'Box' },
        { id: Date.now(), title: 'Журнал', iconName: 'Archive' },
    ];

    checkbox = false;
}
</script>

<style lang="scss">
.todo {
    background: none !important;
    display: flex;

    &__items {
        flex-direction: column;
        margin-left: 48px;

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
            margin-left: 8px;
            margin-top: 36px;
            display: flex;
            align-items: center;

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
    }

    .v-text-field > .v-input__control > .v-input__slot:after {
        border: none !important;
    }

    .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
        border: none !important;
    }
}
</style>
