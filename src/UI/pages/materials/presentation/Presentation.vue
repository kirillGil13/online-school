<template>
  <v-row class="main-row">
    <v-col cols="12">
      <Header :isBordered="false" title="Презентации от компании"
              :description="'Здесь отображаются все документы, которые будут полезны в расширении своей сети'"
              class="top_bar_p_0">
      </Header>
    </v-col>
    <v-col cols="12">
      <new-presentation-slider v-if="promoPresentations" :presentations="promoPresentations"></new-presentation-slider>
    </v-col>
    <v-col cols="12">
      <tabs :tabs="tabs">
        <tabs-content
            v-for="(tab, index) in tabs"
            :key="index"
            :name="tab.title"
            :selected="tab.isActive"
        >
          <keep-alive>
            <component :is="tab.component" :presentations="presentations"></component>
          </keep-alive>
        </tabs-content>
      </tabs>
    </v-col>
  </v-row>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewPresentationSlider from '@/UI/components/slider/NewPresentationSlider.vue';
import { IPresentationType } from '@/entity/materials/presentations/presentation.types';
import Header from '@/UI/components/common/Header.vue';
import Tabs from '@/UI/components/common/tabs/Tabs.vue';
import TabsContent from '@/UI/components/common/tabs/TabsContent.vue';
import { ITabs } from '@/entity/tabs/tabs.types';
import { TabsStore } from '@/store/modules/Tabs';
import IProductPresentations from '@/entity/materials/presentations/productsPresentation.types';
import PresentationProduct from '@/UI/components/materials/presentation/PresentationProduct.vue';
import { PresentationStore } from '@/store/modules/Presentations';

@Component({
  components: {
    TabsContent,
    Tabs,
    Header,
    NewPresentationSlider,
    PresentationProduct,
  },
})
export default class Presentation extends Vue {

  get tabs(): ITabs[] {
    return TabsStore.presentationTabs
  }

  get presentations(): IProductPresentations[] | null {
    return PresentationStore.presentations
  }

  get promoPresentations(): IPresentationType[] | null {
    return PresentationStore.promoPresentations
  }

  mounted(): void {
    PresentationStore.fetchPresentations()
    PresentationStore.fetchPromoPresentations()
  }
}
</script>

<style lang="scss" scoped>

</style>