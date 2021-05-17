<template>
  <div>
    <div
        class="text-description my-4 ml-2 wrap-text"
        :style="{maxHeight: maxHeight}"
        id="textDescription"
        ref="textDescription"
        v-html="text"
    />
    <div v-if="showAll === false" class="show-all ml-2" @click="showAll = true">
      Показать полностью
    </div>
    <div v-if="showAll === true" class="show-all ml-2" @click="showAll = false">
      Скрыть
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component
export default class TextHide extends Vue {
  @Prop() readonly text!: string;
  @Prop({default: '65px'}) readonly maxHeight!: string;

  showAll = false;

  @Watch('showAll')
  onChangeShall(): void {
    if (this.showAll === true) {
      (this.$refs.textDescription as HTMLElement).style.overflow = 'none';
      (this.$refs.textDescription as HTMLElement).style.maxHeight = 'unset';
    }

    if (this.showAll === false) {

      (this.$refs.textDescription as HTMLElement).style.overflow = 'hidden';
      (this.$refs.textDescription as HTMLElement).style.maxHeight = this.maxHeight;
    }
  }
}
</script>

<style lang="scss">
.text-description {
  overflow: hidden;
}

.show-all {
  font-size: 14px;
  line-height: 170%;
  display: flex;
  align-items: center;
  color: #426df6;
  cursor: pointer;
}
</style>
