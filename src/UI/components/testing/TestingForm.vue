<template>
    <form>
        <span>{{question}}</span>
        <RadioButton :answer="1" @change="$listeners"/>
        <RadioButton :answer="2" @change="$listeners"/>
        <RadioButton :answer="3" @change="$listeners"/>
        <Button>Следующий вопрос</Button>
    </form>
</template>
<script lang="ts">
import { TestingForm } from "@/form/testing/testingForm";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-forms";
import { Component, Vue } from "vue-property-decorator";
import RadioButton from "../common/RadioButton.vue"

@Component({
    components: {
        RadioButton
    }
})
export default class TestingFormVue extends Vue{
    testingForm!: IFormGroup<TestingForm>;
    formBuilder: RxFormBuilder = new RxFormBuilder
    constructor() {
        super();
        this.testingForm = this.formBuilder.formGroup(TestingForm) as IFormGroup<TestingForm>;
    }
}
</script>
