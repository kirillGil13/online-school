<template>
  <el-col>
    <div class="row">
      <ProgressCircleTesting :result="result" />
      <el-col>
        <h3>К сожалению, вы не прошли тестирование.</h3>
        <span class="info">Ничего страшного - вы можете пройти повторно тест через</span>
      </el-col>
    </div>
    <el-divider></el-divider>
    <el-col>
      <Button class="with_icon" @submit="$listeners">Пересмотреть урок</Button>
      <Button class="with_icon secondary" @submit="$listeners">Написать наставнику</Button>
    </el-col>
  </el-col>
</template>
<script lang="ts">
import TestingResult from "@/entity/testingResult/testingResult";
import ProgressCircleTesting from "@/UI/components/progress/ProgressCircleTesting.vue"
import Button from "@/UI/components/common/Button.vue"
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {
        ProgressCircleTesting,
        Button
    }
})
export default class Proceed extends Vue {
    @Prop() readonly result!: TestingResult;
}
</script>