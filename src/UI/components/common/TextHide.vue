<template>
  <div>
    <div
        class="text-description my-4 ml-2 wrap-text"
        id="textDescription"
        ref="textDescription"
        v-html="content"
    />
    <template v-if="strings > 3">
      <div v-if="showAll === false" class="show-all ml-2" @click="showAll = true">
        Показать полностью
      </div>
      <div v-if="showAll === true" class="show-all ml-2" @click="showAll = false">
        Скрыть
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component
export default class TextHide extends Vue {
  @Prop() readonly text!: string;
  @Prop({default: '65px'}) readonly maxHeight!: string;
  showAll = false;
  strings = 0;

  get content(): string {
    if (this.text.split('\n').length > 3 && !this.showAll) {
      this.strings = this.text.split('\n').length;
      return this.text.split('\n').splice(0,3).join('\n');
    } else {
      return this.text;
    }
  }
}
</script>

<style lang="scss">
//.text-description {
//  overflow: hidden;
//}

.show-all {
  font-size: 14px;
  line-height: 170%;
  display: flex;
  align-items: center;
  color: #426df6;
  cursor: pointer;
}
</style>
