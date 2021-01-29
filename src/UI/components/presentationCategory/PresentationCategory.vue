<template>
  <div>
    <v-col class="category box-padding box-container">
      <Header :title="presentationCat.name"
              class="top_bar_small mb-6"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl scelerisque pretium aliquet molestie viverra dolor cursus. Nulla fusce dictum neque volutpat sollicitudin ante. Sed euismod turpis nulla massa neque vitae mattis. Ligula ullamcorper in rutrum at."></Header>
      <div class="d-flex flex-row flex-wrap">
        <PresentationComponent :presentation="item" v-for="(item, index) in presentationCat.presentations" :key="index"/>
      </div>
      <div class="d-flex justify-center">
        <Button>Загрузить еще</Button>
      </div>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import Header from '@/UI/components/common/Header.vue';
import {IPresentationCategory} from '@/entity/presentations/presentation.types';
import PresentationComponent from '@/UI/components/presentationCategory/presentation/PresentationComponent.vue';


@Component({
  components: {
    Header,
    PresentationComponent
  }
})
export default class PresentationCategory extends Vue {
  @Prop() readonly presentationCat!: IPresentationCategory;
}
</script>
<style lang="scss">
.category {
  h1 {
    margin: 0 !important;
  }
  padding: 16px !important;
}
</style>
