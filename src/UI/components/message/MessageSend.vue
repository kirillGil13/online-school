<template>
    <div class="d-flex flex-column" style="width: 100%">
        <div class="d-flex pa-3 preview-container" v-if="pictures.length !== 0">
            <template v-for="(image, id) in pictures">
                <div
                    class="previewImage"
                    :key="id"
                    :style="{
                        backgroundImage: `url(${image.long})`,
                        width: $adaptive.isMobile ? '50px' : '72px',
                        height: $adaptive.isMobile ? '50px' : '72px',
                    }"
                >
                    <div class="btn-delete-prev-img mr-1" @click="deletePrevImg(id)">
                        <v-icon class="btn-delete-prev-img__icon" small>mdi-delete-forever</v-icon>
                    </div>
                </div>
            </template>
        </div>
        <div class="message-send d-flex flex-row align-end">
            <div class="d-flex align-end mr-2" style="height: 100%">
                <v-icon style="padding: 6px 8px; margin-top: 0 !important;min-height: 40px" class="send-picture" @click="activateInput"
                    >mdi-folder-image</v-icon
                >
                <input type="file" multiple accept="image/*" id="upload" @change="loadPicture" />
            </div>

            <div class="send mr-5">
                <v-textarea
                    class="input mt-0"
                    v-model="messageText"
                    placeholder="Сообщение"
                    color="#000000"
                    outlined
                    row-height="2"
                    rows="1"
                    background-color="#FBFCFE"
                    auto-grow
                    single-line
                    dense
                    id="message-comment"
                    filled
                    hide-details
                >
                </v-textarea>
            </div>

            <div class="d-flex align-end" style="height: 100%">
                <svg-icon class="send-icon" style="margin-bottom: 6px" name="Send" @click="sendMessage"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormGroup from '../../components/common/form/FormGroup.vue';
import { PictureUploadStore } from '../../../store/modules/PictureUpload';
import { IPictureUpload } from '@/entity/common/pictureUpload.types';
import { WebSocketStore } from '@/store/modules/WebSocket';

@Component({
    components: { FormGroup },
})
export default class MessageSend extends Vue {
    messageText = '';
    image = '';
    pictures: {short: string; long: string}[] = [];

    get picture(): IPictureUpload | null {
        return PictureUploadStore.pictureUpload;
    }

    get socket(): WebSocket | null {
        return WebSocketStore.socket;
    }

    sendMessage(): void {
        if (this.messageText.length === 0 && this.pictures.length === 0) {
            return;
        }

        const arrForSend = this.pictures.map(el => el.short);

        const el = {
            type: 'send-message-service_type',
            data: {
                text: this.messageText.toString(),
                purposeAccountId: this.$route.params.id,
                photo_links: arrForSend,
            },
        };

        this.socket!.send(JSON.stringify(el));
        this.messageText = '';
        this.pictures = [];
    }

    activateInput(): void {
        document.getElementById('upload')!.click();
    }

    deletePrevImg(id: number): void {
        this.pictures.splice(id, 1);
    }

    async loadPicture(e: any): Promise<void> {
      const selectedImages = e.target.files;
      selectedImages.forEach(async (element: any) => {
          await PictureUploadStore.set({ file: element });
          if (this.picture) {
              this.pictures.push({
                short: this.picture.shortLink,
                long: this.picture.fullLink
              });
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

                            max-height: 192px;
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

.preview-container {
    background: rgba(0, 0, 0, 0);
    transition: height 0.2s ease;
    border-top: 1px solid #f0f2f6;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
}

.previewImage {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    margin-left: 6px;
    position: relative;

    &:nth-child(1) {
        margin-left: 0;
    }

    .btn-delete-prev-img {
        position: absolute;
        cursor: pointer;
        right: 0;

        &__icon {
            background: #fff;
            border-radius: 50%;
        }
    }
}
</style>
