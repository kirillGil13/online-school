<template>
  <div class="sidebar">
    <Logo width="34px" height="34px" font-size="14px" id="step-0"/>
    <account-badge :userInfo="userInfo" :userId="userId" v-on="$listeners"/>
    <Menu/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IFakeUserInfo} from '@/entity/environment';
import Menu from './Menu.vue';
import AccountBadge from './AccountBadge.vue';
import Logo from '@/UI/components/common/Logo.vue';

@Component({
  name: 'MainAccountCard',
  components: {
    Menu,
    AccountBadge,
    Logo
  },
})
export default class extends Vue {
  @Prop({required: true}) userInfo!: IFakeUserInfo;
  @Prop({required: true}) userId!: number;
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  border-radius: $main_border_radius;
  margin-bottom: 50px;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

</style>
