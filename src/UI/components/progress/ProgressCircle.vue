<template>
        <vue-ellipse-progress
        :progress="progress"
        :size="12"
        color="#27AE60"
        emptyColor="#3d685e"
        :thickness="6"
        :emptyThickness="6"
        line="butt"
        :legend="false"
        />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ProgressCircle extends Vue {
    @Prop({default: 0}) readonly progress!: number
}
</script>
<style lang="scss">

</style>