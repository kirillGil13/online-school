<template>
  <div class="alert">
    <v-alert
        color="#426DF6"
        :dismissible="icon"
    >
      <v-row class="pa-1" align="center">
        <v-col class="pa-0 ml-4 white--text" cols="8">
          {{text}}
        </v-col>
        <v-col class="pa-0 text-right">
          <Button v-if="!icon" class="mt-0 secondary_white" small v-on="$listeners">Подтвердить</Button>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from './Button.vue';
@Component({
  components: {Button}
})
export default class Confirm extends Vue {
  @Prop({required: true, default: ''}) readonly text!: string;
  @Prop() readonly show!: boolean;
  @Prop({type: Boolean, default: false}) readonly icon!: boolean;

  set showAlert(show: boolean) {
    this.$emit('show', show);
  }

  get showAlert(): boolean {
    return this.show;
  }
}
</script>

<style lang="scss" scoped>
.alert {
  font-size: 14px !important;
  width: 100%;
  .v-alert {
    border-radius: 12px !important;
  }
  .svg-icon {
    width: 24px !important;
    height: 24px !important;
  }
}
</style>
