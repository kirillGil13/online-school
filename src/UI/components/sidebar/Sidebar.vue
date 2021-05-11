<template>
  <div class="sidebar">
    <Logo width="150px" id="step-0"/>
    <account-badge :userInfo="userInfo" :userId="userId" v-on="$listeners"/>
    <Menu :unReadMessages="unReadMessages"/>
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
  @Prop() unReadMessages!: number;
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
  border: 1px solid #F2F2F2;
  box-shadow: 0px 14px 12px rgba(0, 0, 0, 0.01);
}

</style>
