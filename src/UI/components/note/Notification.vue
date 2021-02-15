<template>
  <div class="notification d-flex justify-start mt-3">
    <div :class="['note-container', active ? 'active' : '']">
      <div class="note-title">{{title}}</div>
      <div class="desc-container d-flex flex-row justify-space-between mt-1">
        <div class="desc mr-7">{{desc}}</div>
        <div class="date mt-2 d-flex align-end">{{date}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Notification extends Vue{
  @Prop() readonly title!: string;
  @Prop() readonly desc!: string;
  @Prop() readonly date!: string;
  @Prop() readonly active!: boolean;
}
</script>

<style lang="scss">
.notification {
  width: 100%;

  .note-container {
    max-width: 349px;
    padding: 12px 16px 13px 16px;
    background: rgba(66, 109, 246, 0.12);
    border: 1px solid rgba(87, 81, 183, 0.12);
    border-radius: 5px;
    &.active {
      background: #FFFFFF;
    }
    .note-title {
      color: #426DF6;
    }

    .desc-container {
      color: #5F739C;

      .date {
        font-size: 12px;
      }
    }
  }
}
</style>