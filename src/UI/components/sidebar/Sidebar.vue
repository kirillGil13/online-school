<template>
    <div class="sidebar">
        <h3 class="sidebar__logo">ONELINKS.COM</h3>
        <account-badge :userInfo="userInfo" />
        <Menu/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IFakeUserInfo } from '@/entity/environment';
import Menu from './Menu.vue';
import AccountBadge from './AccountBadge.vue';

@Component({
    name: 'MainAccountCard',
    components: {
        Menu,
        AccountBadge,
    },
})
export default class extends Vue {
    @Prop({ required: true }) userInfo!: IFakeUserInfo;
}
</script>

<style lang="scss" scoped>
.sidebar {
    max-width: 290px;
    border-radius: $main_border_radius;
    margin-bottom: 50px;
    padding: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    
    &__logo {
        font-size: 24px;
        margin-bottom: 20px;
    }
}

</style>
