<template>
  <div>
    <v-col class="pa-0">
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import IProductPresentations from '@/entity/materials/presentations/productsPresentation.types';
import PresentationCategory from '@/UI/components/presentationCategory/PresentationCategory.vue';
@Component({
  components: {PresentationCategory}
})
export default class OrganizationPresentations extends Vue {
  @Prop() readonly presentations!: IProductPresentations;
}
</script>

<style lang="scss">

</style>