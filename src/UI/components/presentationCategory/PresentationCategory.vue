<template>
  <div>
    <v-col class="box-padding box-container" v-for="(item, index) in presentations.subcategories" :key="index">
      <Header :title="item.name"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl scelerisque pretium aliquet molestie viverra dolor cursus. Nulla fusce dictum neque volutpat sollicitudin ante. Sed euismod turpis nulla massa neque vitae mattis. Ligula ullamcorper in rutrum at."></Header>
        <MaterialProduct :presentations="item.presentations"/>
      <div class="show">
        <Button>Загрузить еще</Button>
      </div>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import Header from '@/UI/components/common/Header.vue';
import IProductPresentations from '@/entity/materials/presentations/productsPresentation.types';
import MaterialProduct from '@/UI/components/materialProduct/MaterialProduct.vue';


@Component({
  components: {
    Header,
    MaterialProduct
  }
})
export default class PresentationCategory extends Vue {
  @Prop() readonly presentations!: IProductPresentations;
}
</script>
<style lang="scss">

</style>
