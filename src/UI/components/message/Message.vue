<template>
  <div :class="['message d-flex mt-3', friend ? 'justify-start' : 'justify-end']">
    <div :class="['message-cont', friend ? 'friend' : '']">
      <div class="message-body d-flex flex-row justify-space-between mt-1">
        <div class="text mr-7">{{body}}</div>
        <div class="date mt-2 d-flex align-end">{{date}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Message extends Vue {
  @Prop() readonly body!: string;
  @Prop() readonly date!: string;
  @Prop() readonly friend!: boolean;
}
</script>

<style lang="scss">
.message {
  width: 100%;
  .message-cont {
    max-width: 349px;
    padding: 12px 16px 13px 16px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    &.friend {
      background: #F2F2F2;
      border: 1px solid rgba(87, 81, 183, 0.12);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
      border-radius: 5px;
    }
    .message-body {
      .text {
        color: #000000;
      }
      .date {
        color: #5F739C;
        font-size: 12px;
      }
    }
  }
}
</style>