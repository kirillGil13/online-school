<template>
    <v-col class="pa-0">
        <div class="progress">Вопрос {{ step }} из {{ amount }}</div>
        <div class="full-width dash_container">
            <v-col class="pa-0 mr-2" v-for="number in amount" :key="number">
                <div :class="['dash', activeStep[number - 1].active ? 'active' : '']" :id="number" ref="dash"></div>
            </v-col>
        </div>
        <v-divider class="divider"></v-divider>
    </v-col>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ITestingFormActiveStep} from '@/form/testing/testingForm.types';

@Component
export default class ProgressBar extends Vue {
    @Prop({ default: 0 }) readonly amount!: number;
    @Prop({ default: 1 }) readonly step!: number;
    @Prop() readonly activeStep!: ITestingFormActiveStep[];
}
</script> 
<style lang="scss">
.dash {
    content: '';
    height: 4px;
    background: rgba(66, 109, 246, 0.12);
    border-radius: 3px;
    &.active {
        background: #426df6;
    }
}
.progress {
    color: #426df6;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 8px;
}
.dash_container {
    display: flex;
    flex-flow: row nowrap;
    .col {
        &:nth-last-child(1) {
            margin-right: 0 !important;
        }
    }
    .dash {
        flex-grow: 1;
    }
}
.divider {
    margin-top: 16px !important;
    margin-bottom: 16px !important;
}
</style>
