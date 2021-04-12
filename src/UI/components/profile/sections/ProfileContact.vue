<template>
  <ProfileContactDataFormComponent :form="contactForm" @submit="$emit('saveContact')" v-on="$listeners" :change-email-form="changeEmailForm"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ProfileContactDataForm} from '../../../../form/profile/contactData/ProfileContactDataForm';
import ProfileContactDataFormComponent from '../../forms/profile/ProfileContactDataFormComponent.vue';
import {ChangeEmailForm} from '../../../../form/changeEmail/changeEmail';
@Component({
  components: {ProfileContactDataFormComponent}
})
export default class ProfileContact extends Vue {
  @Prop({required: true}) readonly contactForm!: ProfileContactDataForm;
  @Prop({ required: true }) readonly changeEmailForm!: ChangeEmailForm;

}
</script>

<style lang="scss">

</style>
