<template>
  <div class="courses">
    {{presentation}}
    <div class="course-block" @click="$emit('proceed', item.id)" v-for="(item, index) in presentation" :key="index">
      <div class="course-video-block" :style="{ backgroundImage: 'url(' + item.cover + ')' }">
        <div class="course-info progress">
          <div class="text"><svg-icon name="DownLoad_Cloud"></svg-icon>24</div>
        </div>
        <div class="course-info share"><svg-icon name="Share"></svg-icon></div>
      </div>
      <div class="course-title">{{ item.title }}</div>
      <div class="course-description">Вы решили, что пора наконец обновить автомобиль? Выбрали подходящую и достойную марку и модель, но реальные возможности не всегда совпадают с плана...</div>
      <div class="course-download">
        <svg-icon name="DownLoad">Скачать презентацию ({{item.fileSize}} КБ)</svg-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IPresentationType} from '@/entity/materials/presentations/presentation.types';

@Component
export default class MaterialProduct extends Vue {
  @Prop() readonly presentation!: IPresentationType[];
}
</script>
