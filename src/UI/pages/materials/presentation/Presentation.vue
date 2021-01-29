<template>
  <v-row class="main-row">
    <v-col cols="12">
      <Header :isBordered="false" title="Презентации от компании"
              :description="'Здесь отображаются все документы, которые будут полезны в расширении своей сети'"
              class="top_bar_p_0">
      </Header>
    </v-col>
    <v-col cols="12">
    </v-col>
  </v-row>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import { ITabs } from '@/entity/tabs/tabs.types';
import { TabsStore } from '@/store/modules/Tabs';

@Component({
  components: {
    Header,
  },
})
export default class Presentation extends Vue {

  get tabs(): ITabs[] {
    return TabsStore.presentationTabs
  }
}
</script>

<style lang="scss" scoped>

</style>
