<template>
  <v-bottom-navigation
      color="primary"
      app
      height="67"
      grow
      fixed
  >
    <div class="d-flex justify-center align-start full-width">
      <div class="d-flex flex-row flex-nowrap justify-space-between align-center full-width px-6 pt-3">
        <template v-for="(item, index) in menu">
          <div v-if="item.route" :style="{minWidth: 'max-content'}" class="mt-0 d-flex justify-center align-center bottom-link" :key="index">
            <router-link :to="{name: item.route}" exact-active-class="active-item">
              <svg-icon class="svg-28" :name="item.iconName"></svg-icon>
            </router-link>
          </div>
          <div v-else :style="{minWidth: 'max-content'}" class="mt-0 d-flex justify-center align-center bottom-link"
               :key="index" @click="handle(item)" :id="(item.extraAction && item.title !== undefined) && 'intercom'">
            <svg-icon class="svg-28" :name="item.iconName"></svg-icon>
          </div>
        </template>
      </div>
    </div>
    <Modal :activator="activator" @activatorChange="activatorChange" max-width="100%" modal-class="modal-navigation"
           width="100%" color="#ffffff" from-bottom>
      <template v-slot:content>
        <div class="d-flex flex-column full-width px-4 py-6 modal-list">
          <div class="d-flex flex-row" @click="addCandidate">
            <svg-icon name="Candidates_Mobile" class="svg-28 mr-3"></svg-icon>
            <div>Добавить кандидата</div>
          </div>
          <div class="d-flex flex-row mt-3" @click="addTask">
            <svg-icon name="Todo_list" class="svg-28 mr-3"></svg-icon>
            <div>Добавить заметку</div>
          </div>
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

  addTask(): void {
    this.activator = false;
    this.$emit('addTask');
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
.bottom-link {}
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
.active-item {
  svg {
    path {
      fill: #212121 !important;
    }
  }
}
.modal-list {
  div {
    font-size: 16px;
    font-weight: 600;
    svg {
      path {
        fill: #426DF6 !important;
      }
    }
  }
}
</style>
