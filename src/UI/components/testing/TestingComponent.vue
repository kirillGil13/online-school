<template>
    
</template>
<script lang="ts">
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-forms";
import { Component, Vue } from "vue-property-decorator";
import TestingFormVue from "./TestingForm.vue";
import { TestingForm }from "@/form/testing/testingForm"

@Component({
    components: {
        TestingFormVue
    }
})
export default class TestingComponent extends Vue {
    
} 
</script>