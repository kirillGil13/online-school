<template>
  <v-row class="chat-header" no-gutters>
    <Search/>
    <v-row class="header-actions d-flex justify-space-between align-center" no-gutters>
      <div class="user d-flex flex-row align-center">
        <v-avatar size="32" class="mr-3 ml-4">
          <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFnG0huY6whcqQtmgJDP7XgSb8VCpmLUnKXw&usqp=CAU"
              alt="">
        </v-avatar>
        <div class="user__name">Руслан Габидуллин</div>
      </div>
      <div class="actions d-flex flex-row justify-space-between">

        <router-link :to="{name: routeName.ChatMain}" >
          <div class="actions__item">
            Чат
          </div>
        </router-link>
        <router-link :to="{name: routeName.ChatNotes}" >
          <div class="actions__item">
            Уведомления
          </div>
        </router-link>
        <router-link :to="{name: routeName.ChatTasks}" class="mr-4">
          <div class="actions__item">
            Задания
          </div>
        </router-link>
      </div>
    </v-row>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {RouterNameEnum} from '@/router/router.types';
import Search from '@/UI/components/common/Search.vue';
@Component({
  components: {Search}
})
export default class ChatHeader extends Vue {
  routeName = RouterNameEnum;
}
</script>

<style lang="scss">
.chat-header {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);

  .search {
    width: 327px;

    .svg-icon {
      left: 20px;
    }

    input {
      width: 100%;
      border: none;
      border-top-left-radius: 12px;
      padding: 13px 0;
    }
  }

  .user {
    &__name {
      font-size: 16px;
    }
  }

  a {
    color: #5F739C;
    font-size: 14px;
    &.router-link-exact-active {
      background: rgba(66, 109, 246, 0.12);
      border-radius: 24px;
    }
    .actions {
      &__item {
        cursor: pointer;
        padding: 6px 16px;
      }
    }
  }
}
</style>