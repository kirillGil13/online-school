<template>
  <div class="row">
    <input type="radio" :value="value" name="radioButton" @change="$emit('change', value)" id="radioButton" />
    <label for="radioButton">{{value}}</label>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RadioButton extends Vue {
  @Prop({ default: '' }) readonly value!: string;
}
</script>