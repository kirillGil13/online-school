<template>
    <button :disabled="disabled" @click="submit" class="form-button">{{btnText}}</button>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Button extends Vue{
    @Prop({default: false}) readonly disabled!: boolean;
    @Prop({default: ''}) readonly btnText!: string;
    submit(){
        this.$emit('submit');
    }
}
</script>