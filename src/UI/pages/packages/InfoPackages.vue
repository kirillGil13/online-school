<template>
  <v-row class="container_a">
      <v-col>
        <Header :isBordered="false" title="Инфопакеты" class="top_bar_p_0"
                description="Здесь отображаются все инфопакеты компании">
        </Header>
      </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';

@Component({
  components: {
    Header
  }
})
export default class InfoPackages extends Vue {

}
</script>

<style lang="scss">

</style>