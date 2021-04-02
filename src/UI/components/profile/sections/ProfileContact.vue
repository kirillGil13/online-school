<template>
  <ProfileContactDataFormComponent :form="contactForm" @submit="$emit('saveContact')"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ProfileContactDataForm} from '../../../../form/profile/contactData/ProfileContactDataForm';
import ProfileContactDataFormComponent from '../../forms/profile/ProfileContactDataFormComponent.vue';
@Component({
  components: {ProfileContactDataFormComponent}
})
export default class ProfileContact extends Vue {
  @Prop({required: true}) readonly contactForm!: ProfileContactDataForm;
}
</script>

<style lang="scss">

</style>
