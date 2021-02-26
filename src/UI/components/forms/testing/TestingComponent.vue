<template>
    <div>
        <h5>Тестирование</h5>
        <TestingFormVue :form="form" v-if="!activeResult" :questions="questions" v-on="$listeners"/>
        <TestingResultComponent v-if="activeResult" v-on="$listeners" :result="result" :buttonType="result.result()" />
    </div>
</template>
<script lang="ts">
import Button from '../../common/Button.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TestingFormVue from './TestingForm.vue';
import { TestingForm } from '../../../../form/testing/testingForm';
import TestingResult from '../../../../entity/testingResult/testingResult';
import TestingResultComponent from './TestingResultComponents/TestingResultComponent.vue';
import {ITesting} from '../../../../entity/testing/testing.types';

@Component({
    components: {
        TestingFormVue,
        Button,
        TestingResultComponent,
    },
})
export default class TestingComponent extends Vue {
    @Prop() readonly form!: TestingForm;
    @Prop() readonly result!: TestingResult;
    @Prop() readonly questions!: ITesting[];
    @Prop({default: false}) readonly activeResult!: boolean;
}
</script>
<style lang="scss">
button {
    float: right;
}
</style>
