<template>
    <div class="logo" @click="proceed">
      <v-img src="@/UI/assets/ONELINKSCOM.svg" alt="onelinks" contain :width="width" :max-width="width" class="img"></v-img>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Logo extends Vue {
  @Prop({default: ''}) readonly width!: string;
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
    letter-spacing: 3px;
    text-shadow:  0.5px 0px 0px #000000;
    .img {
      margin-right: 4px;
    }
    h3 {
      line-height: 100%;
    }
  }
</style>
