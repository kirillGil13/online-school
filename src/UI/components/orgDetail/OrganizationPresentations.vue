<template>
  <div>
    <v-col class="pa-0">
      <PresentationCategory class="mb-4" v-for="(item, index) in presentationsCat" :key="index" :presentationCat="item"/>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PresentationCategory from '@/UI/components/presentationCategory/PresentationCategory.vue';
import {IPresentationCategory} from '@/entity/presentations/presentation.types';
import {PresentationStore} from '@/store/modules/Presentations';
import Presentation from '@/entity/presentations/presentation';
@Component({
  components: {PresentationCategory}
})
export default class OrganizationPresentations extends Vue {
  presentationsCat: IPresentationCategory[] = [];

  constructor() {
    super();
    for (let i = 0; i < this.presentationsTest.length; i++) {
      this.presentationsCat.push(new Presentation(this.presentationsTest[i]));
    }
  }

  get presentationsTest(): IPresentationCategory[] {
    return PresentationStore.presentations;
  }
}
</script>

<style lang="scss">

</style>