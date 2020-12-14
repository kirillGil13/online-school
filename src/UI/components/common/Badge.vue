<template>
    <div class="badge">
        <div class="badge__title">
            <slot name="title" />
        </div>
        <div>
            <slot name="default" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Profile extends Vue {}
</script>

<style lang="scss">
.badge {
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: $main_border_radius;
    border: 1px solid #e8edfe;
    padding: 8px;
    &__title {
        font-family: $font-family-base;
        font-size: $main_font_size;
        color: $link;
    }
}
</style>
