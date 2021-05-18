<template>
    <div class="d-flex">
        <div class="message-send d-flex flex-row align-end">
           <div class="d-flex align-center mr-2" style="height: 100%">
               <v-icon style="padding: 6px 4px; margin-top: 0 !important;" class="send-picture" @click="activateInput">mdi-folder-image</v-icon>
              <input type="file" multiple accept="image/*" id="upload" @change="loadPicture" />
            </div>
             
            <div class="send mr-5">
                <v-textarea
                    class="input"
                    v-model="messageText"
                    placeholder="Сообщение"
                    color="#000000"
                    outlined
                    row-height="30"
                    rows="1"
                    background-color="#FBFCFE"
                    auto-grow
                    single-line
                >
                </v-textarea>
            </div>
            
            <div class="d-flex align-center" style="height: 100%">
              <svg-icon class="send-icon" name="Send" @click="sendMessage"></svg-icon>  
            </div>
        </div>  
        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormGroup from '../../components/common/form/FormGroup.vue';
import {PictureUploadStore} from '../../../store/modules/PictureUpload';
import {IPictureUpload} from '@/entity/common/pictureUpload.types';
import { WebSocketStore } from '@/store/modules/WebSocket';


@Component({
  components: {FormGroup}
})
export default class MessageSend extends Vue {
    messageText = '';
    image = '';

    get picture(): IPictureUpload | null {
      return PictureUploadStore.pictureUpload;
    }

    get socket(): WebSocket | null {
      return WebSocketStore.socket;
    }

    sendMessage(): void {
        this.$emit('sendMessage', this.messageText);
        this.messageText = '';
    }

    activateInput(): void {
      document.getElementById('upload')!.click();
    }

    async loadPicture(e: any): Promise<void> {
      const selectedImages = e.target.files;
      selectedImages.forEach(async (element: any) => {
        await PictureUploadStore.set({ file: element });
        if (this.picture) {
          const el = {
            type: "send-message-service_type",
            data: {
              purposeAccountId : this.$route.params.id,
              photo_links : [this.picture.shortLink]
            }
          }
        
        this.socket!.send(JSON.stringify(el))
      }
      });
      

      
    }
}
</script>

<style lang="scss">
.message-send {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.04);
    border-bottom-right-radius: 12px;
    padding: 8px 16px 8px 12px;

    .svg-icon {
        width: 28px !important;
        height: 28px !important;
        cursor: pointer;
    }

    .send {
        position: relative;
        width: 100%;

        .input {
            width: 100%;
            border: none !important;
            .v-input__control {
                .v-input__slot {
                    margin-bottom: 0 !important;
                    padding-left: 16px !important;
                    fieldset {
                        font-size: 16px;
                        background: #fbfcfe;
                        padding-left: 16px !important;
                        border: 1px solid #f2f2f2;
                        border-radius: 8px;
                    }

                    .v-text-field__slot {
                        textarea {
                            margin-top: 14px;
                            max-height: 196px;
                            overflow: scroll;
                            &::placeholder {
                                color: #5f739c;
                            }
                        }
                    }
                }

                .v-text-field__details {
                    display: none !important;
                }
            }
        }

        .v-input__prepend-outer {
            margin-bottom: 14px;
            margin-top: 0;
            display: flex;
            align-self: flex-end;
        }
    }
    .send-icon {
        width: 28px !important;
        height: 28px !important;
        cursor: pointer;
    }
}
</style>