<template>
  <v-container>
    <v-col>
      <Header :isBordered="false" title="Партнеры" class="top_bar_p_0"
              description="Здесь отображаются партнеры, которых вы пригласили">
        <Search/>
      </Header>
      <v-col>
        <TablePartners/>
      </v-col>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import Search from '@/UI/components/common/Search.vue';
import TablePartners from '@/UI/components/tables/TablePartners.vue';

@Component({
    components: {
        Header,
        Search,
        TablePartners,
    },
})
export default class Partners extends Vue {}
</script>

<style lang="scss">
.top_bar {
    align-items: flex-end;
}
</style>
