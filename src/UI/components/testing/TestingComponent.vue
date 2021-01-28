<template>
    <v-col class="box-container pa-6 mt-4">
        <h5>Тестирование</h5>
        <TestingFormVue :form="form" v-show="!active" :questions="questions"/>
        <!--<TestingResultComponent v-show="active" v-on="$listeners" :result="result" :buttonType="result.result()" />-->
    </v-col>
</template>
<script lang="ts">
import Button from '../common/Button.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TestingFormVue from './TestingForm.vue';
import { TestingForm } from '@/form/testing/testingForm';
import TestingResult from '@/entity/testingResult/testingResult';
import TestingResultComponent from './TestingResultComponents/TestingResultComponent.vue';
import {ITesting} from '@/entity/testing/testing.types';

@Component({
    components: {
        TestingFormVue,
        Button,
        TestingResultComponent,
    },
})
export default class TestingComponent extends Vue {
    active = false;
    @Prop() readonly form!: TestingForm;
    @Prop() readonly result!: TestingResult;
    @Prop() readonly questions!: ITesting[];
}
</script>
<style lang="scss">
button {
    float: right;
}
</style>
