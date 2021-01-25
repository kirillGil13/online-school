<template>
  <v-row>
    <v-col>
      <Header
          :isBordered="false"
          title="Презентации от компании"
          class="top_bar_p_0"
          description="Здесь отображаются все документы, которые будут полезны в расширении своей сети"
      >
      </Header>
    </v-col>
  </v-row>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import Header from '@/UI/components/common/Header.vue';

@Component({
  components: {
    Header
  }
})

export default class Presentations extends Vue {

}
</script>
