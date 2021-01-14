<template>
    <v-col class="pa-0">
        <form @submit.prevent>
            <ProgressBar :amount="form.questions.length" :step="step" />
            <TestingQuestion
                v-for="(question, index) in form.questions"
                :key="index"
                :active="step === index + 1"
                :question="question"
                @change="change"
                :resultsAnswerId="form.results[index].answerId"
            />
            <v-row class="ma-0 justify-end">
                <Button class="secondary_blue mr-3" v-if="step > 1" @submit="previous()">Назад</Button>
                <Button v-if="step < form.questions.length" :disabled="!form.valid(step)" @submit="next()"
                    >Следующий вопрос</Button>
                <Button v-if="step === form.questions.length" :disabled="!form.valid(step)" @submit="form.send()"
                    >Отправить задание</Button>
            </v-row>
        </form>
    </v-col>
</template>
<script lang="ts">
import { TestingForm } from '@/form/testing/testingForm';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '../common/Button.vue';
import ProgressBar from '../common/ProgressBar.vue';
import TestingQuestion from './TestingQuestion.vue';

@Component({
    components: {
        Button,
        ProgressBar,
        TestingQuestion,
    },
})
export default class TestingFormVue extends Vue {
    @Prop() readonly form!: TestingForm;
    step = 1;
    next(): void {
        this.step += 1;
    }
    previous(): void {
        this.step -= 1;
    }
    change(id: number): void {
        this.form.results[this.step - 1].answerId = id;
    }
    mounted(): void {
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '';
        });
    }
}
</script>
<style lang="scss">
.question {
    font-size: 16px;
    color: #060516;
    margin-bottom: 16px;
}
</style>
