<template>
  <v-col>
    <InDev/>
  </v-col>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import InDev from '../../components/common/banners/InDev.vue';

@Component({
  components: {InDev}
})
export default class Main extends Vue {
}
</script>
