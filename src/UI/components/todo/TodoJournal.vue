<template>
     <div class="d-flex todo__items" style="width: 100%"  @click.capture="showTextArea = false">
            <div class="items-title">
                <svg-icon name="Archive" style="width: 5%; height: 100%"/>
                <span class="title-text">Журнал</span>
            </div>
            <div class="items-btn-add" @click="showTextArea = true">
                <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
                <span class="btn-add-text">Добавить задачу</span>
            </div>
            <div class="items-add-place" v-if="showTextArea">
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
</template>

<script lang="ts">
import Vue from 'vue'
export default class TodoJournal extends Vue {
     showTextArea = false;
}
</script>


<style lang="scss" scoped>

</style>