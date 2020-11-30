<template>
    <div class="avatar-wrapper">
        <img
            class="avatar"
            :style="{ height: `${size.height}px`, width: `${size.width}px` }"
            :src="imageSourse"
            alt="Avatar"
        />
        <div v-if="star" class="star">
            <svg-icon name="Star" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
interface Size {
    height: number;
    width: number;
}
@Component
export default class Avatar extends Vue {
    @Prop({ required: true }) readonly imageSourse!: string;
    @Prop({ required: true }) readonly size!: Size;
    @Prop({ required: false, default: false }) readonly star!: boolean;
}
</script>

<style scoped lang="scss">
.avatar {
    border-radius: 12px;
}
.star {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    bottom: 0;
    right: 0;
    background-color: white;
    color: #426df6;
    border-radius: 50%;
    height: 16px;
    width: 16px;
}
.avatar-wrapper {
    position: relative;
}
</style>
