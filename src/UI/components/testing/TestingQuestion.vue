<template>
    <div v-if="active">
        <div class="question">{{ question.question }}</div>
        <div>
            <RadioButton
                v-for="answer in question.answers"
                :key="answer.id"
                :id="answer.id"
                :value="answer.answerOption"
                v-on="$listeners"
                :resultsAnswerId="resultsAnswerId"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RadioButton from '../common/RadioButton.vue';
import Testing from '@/entity/testing/testing';

@Component({
    components: {
        RadioButton,
    },
})
export default class TestingQuestion extends Vue {
    @Prop() readonly question!: Testing;
    @Prop({ default: false }) readonly active!: boolean;
    @Prop({ default: null }) readonly resultsAnswerId!: number;
}
</script>
