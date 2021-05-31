<template>
  <div :class="['message d-flex mt-2', friend ? 'justify-start' : 'justify-end']" :id="`message${idx + 1}`">
    <div :class="['message-cont', friend ? 'friend' : 'my-message', body.photoLink.length !== 0 && 'full-width']">
      <div class="message-body d-flex flex-row justify-space-between mt-1">
        <div class="d-flex flex-column full-width">
          <div class="images-container d-flex flex-row flex-wrap mt-1" v-if="body.photoLink.length !== 0">
            <div class="text image-container" :style="{width: (body.photoLink.length === 1 || (body.photoLink.length % 2 === 1 && idx === 0)) && '100%' }" @click="() => showImg(idx)" v-for="(photo, idx) of body.photoLink " :key="idx">
              <div
                  class="image"
                  :style="{ backgroundImage: `url(${photo})`}"
              />
            </div>
          </div>
          <div v-if="body.text" class="text mr-9" :class="[body.photoLink.length > 0 && 'mt-2']">{{body.text}}</div>
        </div>
      </div>
      <div class="date d-flex align-end justify-end" style="margin-bottom: -4px; margin-right: -4px;" :style="{marginTop: body.text ? '-10px' : '4px'}">{{date}}</div>
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
  @Prop() readonly idx!: number;
  imgs = '';
  visible = false;
  index = 0;
  messageWidth = 0;

  showImg(index: number): void {
      this.index = index
      this.visible = true
  }
  handleHide(): void {
    this.visible = false
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  border: none !important;
  background-color: transparent !important;
  .message-cont {
    max-width: 379px;
    padding: 7px 12px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    border-radius: 12px;
    .date {
      color: #5F739C;
      font-size: 10px;
    }

    &.my-message {
      background: #CEDDFB;
    }
    &.friend {
      background: #F2F2F2;
      border: 1px solid rgba(87, 81, 183, 0.12);
    }
    .message-body {

      width: 100%;
      .text {
        color: #000000;
      }
    }
  }

  //.images-container {
  //  display: grid;
  //  grid-template-columns: 1fr 1fr;
  //}

  .image-container {
    width: 50%;
  }

  .image {
    content: '';
    height: 200px;
    width: 100%;
    border-radius: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
