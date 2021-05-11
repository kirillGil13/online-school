<template>
  <v-bottom-navigation
      color="primary"
      app
      height="60"
      grow
      fixed
  >
    <div class="d-flex justify-center align-center full-width">
      <div class="d-flex flex-row flex-nowrap justify-space-between align-center full-width px-6">
        <div :style="{minWidth: 'max-content'}" class="mt-0 d-flex justify-center align-center"
             v-for="(item, index) in menu" :key="index" @click="handle(item)" :id="(item.extraAction && item.title !== undefined) && 'intercom'">
          <svg-icon :class="['bottom-menu-svg wrong-ellipse svg-22', (item.extraAction && item.title === undefined) && 'fill-blue svg-24']" :name="item.iconName"></svg-icon>
        </div>
      </div>
    </div>
    <Modal :activator="activator" @activatorChange="activatorChange" max-width="100%" modal-class="modal-navigation"
           width="100%" color="#ffffff" from-bottom>
      <template v-slot:content>
        <div class="d-flex flex-column full-width px-4 py-4">
          <Button class="mt-0" full-width small @submit="addCandidate">Добавить кандидата</Button>
        </div>
      </template>
    </Modal>
  </v-bottom-navigation>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {IMainMenu} from '../../../entity/menu';
import {MenuStore} from '../../../store/modules/Menu';
import Modal from './Modal.vue';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';
import AccountBadge from '../sidebar/AccountBadge.vue';
import {RouterNameEnum} from '../../../router/router.types';
import Button from './Button.vue';

@Component({
  components: {Button, AccountBadge, Modal}
})
export default class BottomBar extends Vue {



  activator = false;

  activatorChange(act: boolean): void {
    this.activator = act;
  }

  addCandidate(): void {
    this.activator = false;
    this.$emit('addCandidate');
  }

  handle(item: IMainMenu): void {
    if (item.extraAction) {
      if (item.title === undefined) {
        this.activator = true;
      }
    } else {
      this.activator = false;
      this.$router.push({name: item.route});
    }
  }

  get menu(): IMainMenu[] {
    return MenuStore.bottomMenu;
  }

  get user(): IUser | null {
    return AuthStore.user;
  }
}
</script>

<style lang="scss">
.bottom-menu-svg {
  path {
    fill: #5f739c !important;
  }
}

.modal-navigation {
  margin: 0 !important;
  position: absolute;
  bottom: 0;

  &.modal-window {
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  .modal-content {
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
}

.v-bottom-navigation {
  box-shadow: 0px -5px 12px rgb(0 0 0 / 4%) !important
}
</style>
