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
export default class MyStydies extends Vue {
}
</script>
<style lang="scss">

</style>
