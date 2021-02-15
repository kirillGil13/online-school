<template>
  <v-col>
    <div class="d-flex flex-row flex-wrap">
      <InstructionComponent/>
    </div>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import InstructionComponent from '@/UI/components/instruction/InstructionComponent.vue';
@Component({
  components: {InstructionComponent}
})
export default class OrganizationInstructions extends Vue {}
</script>

<style lang="scss">

</style>