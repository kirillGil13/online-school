<template>
  <div class="d-flex flex-row">
    <a :href="`https://facebook.com/${siteLink}`" target="_blank" v-if="siteLink">
      <v-btn
          class="white--text mr-2 mt-0"
          color="black lighten-3"
          icon
          small
      >
        <v-icon small>
          mdi-web
        </v-icon>
      </v-btn>
    </a>
    <a :href="`https://facebook.com/${facebookLink}`" target="_blank" v-if="facebookLink">
      <v-btn
          class="white--text mr-2 mt-0"
          icon
          small
      >
        <v-icon small>
          mdi-facebook
        </v-icon>
      </v-btn>
    </a>
    <a :href="`https://instagram.com/${instagramLink}`" target="_blank" v-if="instagramLink">
      <v-btn
          class="white--text mr-2 mt-0"
          color="red lighten-3"
          icon
          small
      >
        <v-icon small>
          mdi-instagram
        </v-icon>
      </v-btn>
    </a>
    <a :href="`https://vk.com/${vk}`" target="_blank" v-if="vk">
      <v-btn
          class="white--text mr-2 mt-0"
          color="primary"
          icon
          small
      >
        <v-icon small>
          mdi-vk
        </v-icon>
      </v-btn>
    </a>
    <a :href="`https://t.me/${telegram}`" target="_blank" v-if="telegram">
      <v-btn
          class="white--text mt-0"
          color="white"
          icon
          small
      >
        <v-icon small>
          mdi-telegram
        </v-icon>
      </v-btn>
    </a>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Socials extends Vue {
  @Prop({default: ''}) readonly vk!: string;
  @Prop({default: ''}) readonly siteLink!: string;
  @Prop({default: ''}) readonly facebookLink!: string;
  @Prop({default: ''}) readonly instagramLink!: string;
  @Prop({default: ''}) readonly telegram!: string;
}
</script>

<style lang="scss">
.social {
  cursor: pointer;
  width: 17px !important;
  height: 17px !important;
}
</style>
