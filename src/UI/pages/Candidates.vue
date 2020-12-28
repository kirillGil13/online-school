<template>
  <el-container class="container_a">
    <el-container class="ml-36 container_b">
      <el-col>
        <Header :isBordered="false" title="Кандидаты" class="top_bar_p_0"
                description="Здесь отображаются контактные данные всех людей, которые регистрировались по Вашим партнерским ссылкам">
        </Header>
        <el-col class="link-bar">
          <div class="link-container">
            <h5>Ваша ссылка на лендинг</h5>
            <div class="link-content">
              <div class="link"></div>
              <svg-icon name="Copy"></svg-icon>
            </div>
          </div>
          <Search/>
        </el-col>
        <table class="table">
          <tr>
            <td>Имя</td>
            <td>Номер телефона</td>
            <td>Почта</td>
            <td>Видео</td>
            <td>Дата</td>
            <td>Партнер</td>
            <td></td>
          </tr>
          <tr>
            <td>Имя</td>
            <td>Номер телефона</td>
            <td>Почта</td>
            <td>Видео</td>
            <td>Дата</td>
            <td>Партнер</td>
            <td></td>
          </tr>
        </table>
      </el-col>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Header from "@/UI/components/common/Header.vue";
import Search from "@/UI/components/common/Search.vue";

@Component({
  components: {
    Header,
    Search
  }
})
export default class Candidates extends Vue {
}
</script>

<style lang="scss">
.link-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .link-container {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
}
.table {
  width: 100%;
}
</style>