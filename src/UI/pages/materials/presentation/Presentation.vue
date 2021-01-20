<template>
  <v-row class="main-row">
    <v-col cols="12">
      <Header :isBordered="false" title="Презентации от компании" :description="'Здесь отображаются все документы, которые будут полезны в расширении своей сети'" class="top_bar_p_0">
      </Header>
    </v-col>
    <v-col cols="12">
      <new-presentation-slider :presentations="testDataForSwiper"></new-presentation-slider>
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
            <component :is="tab.component" :presentations="testPresentations"></component>
          </keep-alive>
        </tabs-content>
      </tabs>
    </v-col>
  </v-row>

</template>

<script lang="ts">
import {Component, Vue, Mixins} from 'vue-property-decorator';
import NewPresentationSlider from '@/UI/components/slider/NewPresentationSlider.vue';
import {IPresentationType} from '@/entity/materials/presentations/presentation.types';
import Header from '@/UI/components/common/Header.vue';
import Tabs from "@/UI/components/common/tabs/Tabs.vue";
import TabsContent from "@/UI/components/common/tabs/TabsContent.vue";
import {ITabs} from "@/entity/tabs/tabs.types";
import {TabsStore} from "@/store/modules/Tabs";
import IProductPresentations from "@/entity/materials/presentations/productsPresentation.types";
import PresentationProduct from "@/UI/components/materials/presentation/PresentationProduct.vue";
@Component({
  components: {
    TabsContent,
    Tabs,
    Header,
    NewPresentationSlider,
    PresentationProduct
  }
})
export default class Presentation extends Vue {

  get tabs(): ITabs[] {
    return TabsStore.presentationTabs
  }
  testDataForSwiper: IPresentationType[] = [
    {
      id: 1,
      name: 'eget dolor quis a',
      filename: 'eget_dolor_quis_a.pdf',
      fileType: 'pdf',
      fileSize: 272,
      isPaid: false,
      cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
      createdAt: '221112',
      updatedAt: '22212',
    },
    {
      id: 2,
      name: 'eget dolor quis b',
      filename: 'eget_dolor_quis_a.pdf',
      fileType: 'pdf',
      fileSize: 272,
      isPaid: false,
      cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
      createdAt: '221112',
      updatedAt: '22212',
    },
    {
      id: 3,
      name: 'eget dolor quis a',
      filename: 'eget_dolor_quis_a.pdf',
      fileType: 'pdf',
      fileSize: 272,
      isPaid: false,
      cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
      createdAt: '221112',
      updatedAt: '22212',
    },{
      id: 4,
      name: 'eget dolor quis a',
      filename: 'eget_dolor_quis_a.pdf',
      fileType: 'pdf',
      fileSize: 272,
      isPaid: false,
      cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
      createdAt: '221112',
      updatedAt: '22212',
    },{
      id: 5,
      name: 'eget dolor quis a',
      filename: 'eget_dolor_quis_a.pdf',
      fileType: 'pdf',
      fileSize: 272,
      isPaid: false,
      cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
      createdAt: '221112',
      updatedAt: '22212',
    }
  ]
  testPresentations: IProductPresentations[] = [
    {
      id: 1,
      name: 'd',
      subcategories: [
        {
          id:1,
          name: 'Автомобили 25%',
          presentations: [
            {
              id: 1,
              name: 'eget dolor quis a',
              filename: 'eget_dolor_quis_a.pdf',
              fileType: 'pdf',
              fileSize: 272,
              isPaid: false,
              cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
              createdAt: '221112',
              updatedAt: '22212',
            },
          ]
        },
        {
          id: 2,
          name: 'Недвижимость 25%',
          presentations: [
            {
              id: 1,
              name: 'eget dolor quis a',
              filename: 'eget_dolor_quis_a.pdf',
              fileType: 'pdf',
              fileSize: 272,
              isPaid: false,
              cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
              createdAt: '221112',
              updatedAt: '22212',
            },
            {
              id: 2,
              name: 'eget dolor quis a',
              filename: 'eget_dolor_quis_a.pdf',
              fileType: 'pdf',
              fileSize: 272,
              isPaid: false,
              cover: 'https://i.pinimg.com/736x/be/9f/41/be9f417ed861b0ce4e4df3106c108d20.jpg',
              createdAt: '221112',
              updatedAt: '22212',
            },
          ]
        }
      ]
    }
  ]
}
</script>

<style lang="scss" scoped>

</style>