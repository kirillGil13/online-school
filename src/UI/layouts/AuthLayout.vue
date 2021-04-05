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
import {startIntercomMessenger} from '../../plugins/Intercom';
import {AuthStore} from '../../store/modules/Auth';

@Component({
    components: {
        Logo,
        Sidebar,
        Banner,
    },
})
export default class AuthLayout extends Vue {

  created(): void {
    startIntercomMessenger();
  }
}
</script>
<style lang="scss">
.auth {
    padding: 0 16px 0 16px;
    justify-content: center;
    align-items: center;
    background-color: transparent !important;

    &__wrapper {
        padding: 24px;
        width: 100%;
        max-width: 436px;
        background-color: $white;
        border: 1px solid rgba(66, 109, 246, 0.12);
        box-shadow: 4px 4px 40px rgb(68 101 152 / 20%);
        border-radius: 12px;
    }

    .logo {
        justify-content: center !important;
        margin-right: 10px;
        margin-bottom: 36px;
    }
}
</style>
