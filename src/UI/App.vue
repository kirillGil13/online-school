<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthStore } from '@/store/modules/Auth';
@Component
export default class App extends Vue {
    created(): void {
        AuthStore.load();
    }
}
</script>
<style lang="scss"></style>
