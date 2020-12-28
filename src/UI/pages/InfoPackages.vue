<template>
  <el-container class="container_a">
    <el-container class="ml-36 container_b">
      <el-col>
        <Header :isBordered="false" title="Инфопакеты" class="top_bar_p_0"
                description="Здесь отображаются все инфопакеты компании">
        </Header>
      </el-col>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Header from "@/UI/components/common/Header.vue";

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