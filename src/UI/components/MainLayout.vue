<template>
  <div class="mainLayout">
          <el-aside>
          </el-aside>
      <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CourseComponent from "./course/CourseComponent.vue"

@Component({
    components: {
        CourseComponent
    }
})
export default class MainLayout extends Vue {}
</script>

