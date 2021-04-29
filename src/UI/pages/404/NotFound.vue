<template>
<div class="not_found text-center font-weight-bold">
  <Logo width="52px" height="52px" font-size="24px"/>
  <div class="not_found_error">404 (not found)</div>
  <div class="not_found_text">К сожалению страница не найдена...</div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Logo from '../../components/common/Logo.vue';
@Component({
  components: {Logo}
})
export default class NotFound extends Vue {}
</script>

<style lang="scss">
.not_found {
  width: 100%;
  height: 100%;
  font-size: 46px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .not_found_error {
  font-size: 46px;
    min-height: max-content;
  }
  .not_found_text {
    font-size: 24px;
  }
}
</style>
