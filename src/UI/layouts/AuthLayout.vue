<template>
    <div class="content auth">
        <div class="pa-6 auth__wrapper">
            <Logo font-size="24px" height="38px" width="38px" />
            <router-view />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from '../components/common/Banner.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';
import Logo from '../components/common/Logo.vue';

@Component({
    components: {
        Logo,
        Sidebar,
        Banner,
    },
})
export default class AuthLayout extends Vue {}
</script>
<style lang="scss" scoped>
.auth {
    justify-content: center;
    align-items: center;

    &__wrapper {
        padding: 24px;
        min-width: 436px;
        max-width: 436px;
        background-color: $white;
        border: 1px solid rgba(66, 109, 246, 0.12);
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04);
        border-radius: 12px;
    }

    .logo {
        justify-content: center !important;
        margin-right: 10px;
        margin-bottom: 36px;
    }
}
</style>
