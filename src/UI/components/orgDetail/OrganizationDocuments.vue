<template>
  <div>
    <v-col class="doc box-container pb-0">
      <Header title="Оферты и договоры"
              class="top_bar_small mb-6"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl scelerisque pretium aliquet molestie viverra dolor cursus. Nulla fusce dictum neque volutpat sollicitudin ante. Sed euismod turpis nulla massa neque vitae mattis. Ligula ullamcorper in rutrum at."></Header>
      <div class="d-flex flex-row flex-wrap">
        <DocumentComponent :document="item" v-for="(item, index) in documents" :key="index"/>
      </div>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import {DocumentResponseType, IDocument} from '@/entity/document/document.types';
import {DocumentsStore} from '@/store/modules/Documets';
import Documents from '@/entity/document/document';
import DocumentComponent from '@/UI/components/document/DocumentComponent.vue';
@Component({
  components: {DocumentComponent, Header}
})
export default class OrganizationDocuments extends Vue {
  documents: IDocument[] = []

  constructor() {
    super();
    for (let i = 0; i < this.documentsTest.length; i++) {
      this.documents.push(new Documents(this.documentsTest[i]));
    }
  }

  get documentsTest(): DocumentResponseType[] {
    return DocumentsStore.documents;
  }
}
</script>

<style lang="scss">
.doc{
    h1 {
      margin: 0 !important;
    }
    padding: 16px !important;
}
</style>