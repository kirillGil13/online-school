<template>
    <div class="rating">
        <svg-icon name="Star"></svg-icon>
        <span>{{ rating }}</span>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Rating extends Vue {
    @Prop({ default: 0 }) readonly rating!: number;
}
</script>
<style lang="scss">
.rating {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 3px 0 3px;
    position: absolute;
    top: 8px;
    right: 8px;
    border-radius: 3px;
    color: #ffffff;
    font-size: 12px;
    line-height: 150%;
    background: linear-gradient(180deg, #4f79ff 0%, #2150e7 100%);
    backdrop-filter: blur(4px);
    span {
        margin-left: 3px;
    }
}
</style>
