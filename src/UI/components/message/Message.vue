<template>
  <div :class="['message d-flex mt-2', friend ? 'justify-start' : 'justify-end']" :id="`message${idx + 1}`">
    <div :class="['message-cont', friend ? 'friend' : 'my-message']">
      <div class="message-body d-flex flex-row justify-space-between mt-1">
        <div class="d-flex flex-column">
          <div class="text mr-7" >{{body.text}}</div>
          <div class="images-container" :style="{gridTemplateColumns: body.photoLink.length === 1 ? '1fr' : '1fr 1fr', marginRight:  body.photoLink.length === 1 ? '5px' : '10px'}">
             <button class="text image-container" v-if="body.photoLink.length !== 0" @click="() => showImg(idx)" v-for="(photo, idx) of body.photoLink " :key="idx">
              <div
                  @click="activator = true"
                  class="image"

                  :style="{ backgroundImage: `url(${photo})`, width: $adaptive.isMobile ? '150px': body.photoLink.length  > 1 ? '150px' : '300px', height: $adaptive.isMobile ? '130px': body.photoLink.length > 1 ? '150px' : '300px'}"
                />
            </button>
          </div>
         
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
  @Prop() readonly idx!: number;

  activator = false;
  imgs = '';
  visible = false;
  index = 0;
  messageWidth = 0;

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

<style lang="scss" scoped>
.message {
  width: 100%;
  border: none !important;
  background-color: none !important;
  .message-cont {
    max-width: 379px;
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
      
      width: 100%;
      .text {
        color: #000000;
      }
      .date {
        color: #5F739C;
        font-size: 12px;
      }
    }
  }

  .images-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .image-container {
    outline: 0 !important;
    background: 0;
    border: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    overflow: hidden;
    
    
  }

  .image {
    border-radius: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>