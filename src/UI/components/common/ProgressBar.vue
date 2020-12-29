<template>
    <v-col>
        <div class="progress">Вопрос {{ step }} из {{ amount }}</div>
        <div class="full-width dash_container">
            <v-col v-for="number in amount" :key="number">
                <div :class="['dash', number === 1 ? 'active' : '']" :id="number" ref="dash"></div>
            </v-col>
        </div>
        <v-divider class="divider"></v-divider>
    </v-col>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProgressBar extends Vue {
    @Prop({ default: 0 }) readonly amount!: number;
    @Prop({ default: 1 }) readonly step!: number;
    // @Watch('step')
    // onChangeFlag(val: number, oldVal: number): void {
    //     if (val > oldVal) {
    //         this.$refs.dash[val - 1].classList.add('active');
    //     } else {
    //         this.$refs.dash[val].classList.remove('active');
    //     }
    // }
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
    .v-col {
        margin-right: 4px;
        &:nth-last-child(1) {
            margin-right: 0;
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
