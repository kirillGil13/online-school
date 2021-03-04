<template>
    <v-col class="pa-0" v-if="active">
        <div class="question">{{ question.question }}</div>
        <div>
            <RadioButton
                v-for="answer in question.variants"
                :key="answer.id"
                :id="answer.id"
                :value="answer.answer"
                v-on="$listeners"
                :resultsAnswerId="resultsAnswerId"
            />
        </div>
    </v-col>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RadioButton from '../../common/RadioButton.vue';
import Testing from '../../../../entity/testing/testing';
import {ITestingQuestions} from '../../../../entity/testing/testing.types';

@Component({
    components: {
        RadioButton,
    },
})
export default class TestingQuestion extends Vue {
    @Prop() readonly question!: ITestingQuestions;
    @Prop({ default: false }) readonly active!: boolean;
    @Prop({ default: null }) readonly resultsAnswerId!: number;
}
</script>
