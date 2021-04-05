<template>
  <v-col>
    <Header
        :isBordered="false"
        title="Партнеры"
        class="top_bar_p_0"
        description="Здесь отображаются партнеры, которых вы пригласили"
    >
      <Search/>
    </Header>
    <v-row>
      <v-col>
        <TablePartners :partners="partners"/>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import Search from '@/UI/components/common/Search.vue';
import TablePartners from '@/UI/components/tables/TablePartners.vue';
import {AuthStore} from '@/store/modules/Auth';
import {PartnersStore} from '@/store/modules/Partners';
import {IUser} from '@/entity/user';
import {IPartner} from '@/entity/partners';

@Component({
  components: {
    Header,
    Search,
    TablePartners,
  },
})
export default class Partners extends Vue {
  get user(): IUser | null {
    return AuthStore.user;
  }

  get partners(): IPartner[] {
    return PartnersStore.partners;
  }

  async created(): Promise<void> {
    await PartnersStore.fetchAll();
  }
}
</script>

<style lang="scss">
.top_bar {
  align-items: flex-end;
}
</style>
