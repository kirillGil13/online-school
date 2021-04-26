<template>
  <div class="message-send d-flex flex-row align-end">
    <div class="send mr-5">
      <v-textarea class="input" v-model="messageText" placeholder="Сообщение" color="#000000" outlined row-height="30" rows="1"
                  background-color="#FBFCFE" auto-grow single-line
      >
        <template v-slot:prepend>
        </template>
      </v-textarea>
    </div>
    <svg-icon class="send-icon" name="Send" @click="sendMessage"></svg-icon>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class MessageSend extends Vue {
    messageText = '';

    sendMessage(): void {
        this.$emit('sendMessage', this.messageText);
        this.messageText = '';
    }
}
</script>

<style lang="scss" scoped>
.message-send {
  width: 100%;
  background: #FFFFFF;
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
            background: #FBFCFE;
            padding-left: 16px !important;
            border: 1px solid #F2F2F2;
            border-radius: 8px;
          }

          .v-text-field__slot {
            textarea {
              margin-top: 14px;
              max-height: 196px;
              overflow: scroll;
              &::placeholder {
                color: #5F739C;
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
    margin-bottom: 13px;
    cursor: pointer;
  }
}
</style>