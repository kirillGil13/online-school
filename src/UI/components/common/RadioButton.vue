<template>
  <label class="row">
    <div class="row">
      <input
        type="radio"
        :value="id"
        v-model="resultsAnswerIdChange"
        name="radioButton"
        :id="'radioButton' + id"
        ref="radio"
      />
      <div class="background"></div>
      <span class="label">{{value}}</span>
    </div>
  </label>
</template>
<script lang="ts">
import { TestingFormRequestType } from "@/form/testing/testingForm.types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RadioButton extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) readonly id!: number;
  @Prop({ default: null }) readonly resultsAnswerId!: number;
  set resultsAnswerIdChange(id: number) {
      this.$emit('change', this.id);
  }
  get resultsAnswerIdChange() {
      return this.resultsAnswerId;
  }
}
</script>
<style lang="scss">
label {
  width: 100%;
  position: relative;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  margin-bottom: 8px;
  &:nth-last-child(1) {
    margin-bottom: 0;
  }
  div {
    padding: 13px;
    input[type="radio"] {
      margin-right: 13px;
      &:checked + div {
        display: block;
        content: "";
        background: rgba(66, 109, 246, 0.12);
        border: 1px solid #426df6;
        position: absolute;
        width: 95.5%;
        height: 45%;
        border-radius: 5px;
        top: 0;
        left: 0;
      }
    }
    div {
      display: none;
    }
    span {
      color: #060516;
      font-size: 14px;
    }
  }
}
.row {
  align-items: center;
  justify-content: flex-start;
}
</style>