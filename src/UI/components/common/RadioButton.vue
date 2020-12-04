<template>
  <div class="row">
    <input type="radio" :value="answer" name="radioButton" @change="$emit('change', answer)" id="radioButton" />
    <label for="radioButton">{{answer}}</label>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RadioButton extends Vue {
  @Prop({ default: '' }) readonly answer!: string;
}
</script>