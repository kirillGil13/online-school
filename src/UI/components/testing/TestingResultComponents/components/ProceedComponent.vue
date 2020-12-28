<template>
  <el-col>
    <div class="row">
      <ProgressCircleTesting :result="result" />
      <el-col>
        <h3>К сожалению, вы не прошли тестирование.</h3>
        <span class="info">Ничего страшного - вы можете пройти повторно тест через</span>
        <Timer v-if="!showButton" :currentTime="5" @stop="stop"/>
        <Button v-if="showButton" class="again" @submit="$emit('passTestAgain')">Пройти тест повторно</Button>
      </el-col>
    </div>
    <el-divider></el-divider>
    <el-col>
      <Button class="with_icon" @submit="$emit('reviewLesson')">Пересмотреть урок</Button>
      <Button class="with_icon secondary" @submit="$emit('writeMaster')">Написать наставнику</Button>
    </el-col>
  </el-col>
</template>
<script lang="ts">
import TestingResult from "@/entity/testingResult/testingResult";
import ProgressCircleTesting from "@/UI/components/progress/ProgressCircleTesting.vue"
import Button from "@/UI/components/common/Button.vue"
import { Component, Prop, Vue } from "vue-property-decorator";
import Timer from "@/UI/components/common/Timer.vue"

@Component({
    components: {
        ProgressCircleTesting,
        Button,
        Timer
    }
})
export default class Proceed extends Vue {
    @Prop() readonly result!: TestingResult;
    showButton = false;
    stop(isZero: boolean) {
        this.showButton = isZero;
    }
}
</script>
<style lang="scss">
    .again {
        font-size: 12px;
        float: left;
    }
</style>