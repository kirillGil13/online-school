<template>
  <el-col class="table">
    <div class="tr">
      <el-col>Имя</el-col>
      <el-col>Номер телефона</el-col>
      <el-col>Почта</el-col>
      <el-col>Видео</el-col>
      <el-col>Дата</el-col>
      <el-col>Партнер</el-col>
      <el-col></el-col>
    </div>
    <div class="tr tbody" v-for="(candidate, index) in candidates" :key="index">
      <el-col>{{ candidate.name }}</el-col>
      <el-col>{{ candidate.phone }}</el-col>
      <el-col>{{ candidate.email }}</el-col>
      <el-col>
        <div class="video">
          <div class="title">Porttitor euismod.</div>
          <div class="duration">12:08 - 22:12</div>
        </div>
      </el-col>
      <el-col>{{ candidate.createdAt }}</el-col>
      <el-col>
        <Button>Сделать партнером</Button>
      </el-col>
      <el-col>
        <svg-icon name="Calendar_Table"></svg-icon>
      </el-col>
    </div>
  </el-col>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import CandidatesData from "@/entity/candidates/candidates";
import Button from "@/UI/components/common/Button.vue";

@Component({
  components: {
    Button
  }
})
export default class TablePartners extends Vue {
  @Prop() readonly candidates!: CandidatesData[];
}
</script>

<style lang="scss">

</style>