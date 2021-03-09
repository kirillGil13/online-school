<template>
    <v-row>
        <SuccessComponent :result="result" v-on="$listeners" v-if="resultType.GOOD === result.result" />
        <ProceedComponent :result="result" v-on="$listeners" v-if="resultType.MIDDLE === result.result" />
        <FailComponent :result="result" v-on="$listeners" v-if="resultType.BAD === result.result" />
    </v-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TestingResult from '../../../../../entity/testingResult/testingResult';
import { TestingResultComponentsEnum } from '../../../../../entity/common/testingResultComponents.types';
import SuccessComponent from './components/SuccessComponent.vue';
import ProceedComponent from './components/ProceedComponent.vue';
import FailComponent from './components/FailComponent.vue';

@Component({
    components: {
        SuccessComponent,
        ProceedComponent,
        FailComponent,
    },
})
export default class TestingResultComponent extends Vue {
    @Prop() readonly result!: TestingResult;
    resultType = TestingResultComponentsEnum;
}
</script>
<style lang="scss">
h3 {
    margin-bottom: 4px;
    margin-top: 0;
}
.success_info {
  color: #5F739C;
}
.svg {
    height: 24px !important;
    width: 24px !important;
    margin-right: 14px;
    &.next {
        height: 16px !important;
        width: 16px !important;
    }
}
.el-divider {
    margin-bottom: 0;
}
</style>
