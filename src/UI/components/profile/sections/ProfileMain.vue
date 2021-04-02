<template>
  <ProfileMainFormComponent :form="mainForm" @submit="$emit('saveMain')"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ProfileMainInfoForm} from '../../../../form/profile/mainInfo/ProfileMainInfoForm';
import ProfileMainFormComponent from '../../forms/profile/ProfileMainFormComponent.vue';
@Component({
  components: {ProfileMainFormComponent}
})
export default class ProfileMain extends Vue {
  @Prop({required: true}) readonly mainForm!: ProfileMainInfoForm;
}
</script>

<style lang="scss">

</style>
