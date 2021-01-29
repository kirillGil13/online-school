<template>
  <v-col>
    <Header
        :isBordered="false"
        title="Презентации от компании"
        class="top_bar_p_0 presentation__head"
        description="Здесь отображаются все документы, которые будут полезны в расширении своей сети"
    >
    </Header>
    <h3>Новое за последние 7 дней</h3>
    <PresentationsLast/>
    {{ presentations }}
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import PresentationsLast from '@/UI/components/materials/PresentationsLast.vue';
/*import { PresentationStore } from '@/store/modules/Presentations';
import { IPresentationsListItem } from '@/entity/presentations/presentations.types'*/

@Component({
  components: {
    Header,
    PresentationsLast
  }
})

export default class Presentations extends Vue {
  /*get presentations(): IPresentationsListItem[] {
    return PresentationStore.presentations;
  }

  async created(): Promise<void> {
    await PresentationStorefetchAll();
  }*/
}
</script>
<style lang="scss">
.presentation {
  &__head {
    margin-bottom: 36px;
  }
}
</style>
