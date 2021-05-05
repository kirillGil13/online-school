<template>
    <div class="logo" :style="{fontSize: fontSize}" @click="proceed">
      <v-img src="@/UI/assets/logo.png" alt="onelinks" :max-height="height" :max-width="width" class="img"></v-img>
      <h3 class="mb-0">ONELINKS</h3>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Logo extends Vue {
  @Prop({default: ''}) readonly width!: string;
  @Prop({default: ''}) readonly height!: string;
  @Prop({default: ''}) readonly fontSize!: string;

  proceed(): void {
    this.$router.push({path: '/'});
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    cursor: pointer;
    margin-left: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    letter-spacing: 4px;
    text-shadow:  0.5px 0px 0px #000000;
    .img {
      margin-right: 15px;
    }
    h3 {
      line-height: 70%;
    }
  }
</style>
