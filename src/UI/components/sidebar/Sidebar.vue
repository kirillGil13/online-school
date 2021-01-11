<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <v-img src="@/UI/assets/logo.png" alt="onelinks" max-height="30px" max-width="30px" class="img"></v-img>
      <h3>ONELINKS</h3>
    </div>
    <account-badge :userInfo="userInfo"/>
    <Menu/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IFakeUserInfo} from '@/entity/environment';
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
  @Prop({required: true}) userInfo!: IFakeUserInfo;

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
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  &__logo {
    font-size: 13px;
    margin-left: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    letter-spacing: 3px;
    text-shadow:  0.5px 0px 0px #000000;
    .img {
      margin-right: 10px;
    }
  }
}

</style>
