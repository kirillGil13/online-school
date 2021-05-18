<template>
  <div :class="['message d-flex mt-2', friend ? 'justify-start' : 'justify-end']">
    <div :class="['message-cont', friend ? 'friend' : 'my-message']">
      <div class="message-body d-flex flex-row justify-space-between mt-1">
        <div class="text mr-7" v-if="body.photoLink.length === 0">{{body.text}}</div>
        <div class="text mr-3" v-else @click="() => showImg(idx)" v-for="(photo, idx) of body.photoLink " :key="idx">
          <v-img @click="activator = true" max-width="150" max-height="150px"  :src="photo" alt=""/>
        </div>
        <div class="date mt-2 d-flex align-end">{{date}}</div>
      </div>
    </div>
   <vue-easy-lightbox
    :visible="visible"
    :imgs="body.photoLink"
    :index="index"
    @hide="handleHide"
  ></vue-easy-lightbox>
  </div>
</template>

<script lang="ts">
import { IMessages } from '@/entity/messages/messages.types';
import {Component, Prop, Vue} from 'vue-property-decorator';
import Modal from '../common/Modal.vue';
import VueEasyLightbox from 'vue-easy-lightbox'

@Component({
  components: {Modal, VueEasyLightbox}
})
export default class Message extends Vue {
  @Prop() readonly body!: IMessages;
  @Prop() readonly date!: string;
  @Prop() readonly friend!: boolean;

  activator = false;
  imgs = '';
  visible = false;
  index = 0 

  activatorChange(act: boolean): void {
    this.activator = act;
  }

  showImg(index: number): void {
      this.index = index
      this.visible = true
  }
  handleHide(): void {
    this.visible = false
  }
}
</script>

<style lang="scss">
.message {
  width: 100%;
  border: none !important;
  background-color: none !important;
  .message-cont {
    max-width: 349px;
    padding: 7px 12px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    border-radius: 18px;

    &.my-message {
      background: #CEDDFB;
    }
    &.friend {
      background: #F2F2F2;
      border: 1px solid rgba(87, 81, 183, 0.12);
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