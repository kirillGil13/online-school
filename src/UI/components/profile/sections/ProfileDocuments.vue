<template>
  <div>
    <div class="full-doc pa-4 mt-6" v-if="docs.status !== statusName.EMPTY">
      <div :style="{color: resolveStatus().color}">{{resolveStatus().statusName}}</div>
      <div class="mt-1 font-18 d-flex flex-row justify-space-between" style="font-weight: 500">
        {{docs.companyName}}
        <svg-icon name="Pencil" @click="open" style="cursor: pointer" class="svg-28"></svg-icon>
      </div>
    </div>
    <InfoNote v-if="docs.status === statusName.REJECTED" class="mt-6" error title="Причина отклонения" :subtitle="docs.rejectReason"/>
    <ProfileDocumentsFormComponent class="mt-6" v-if="docs.status === statusName.EMPTY || showForm" :form="docForm" @submit="$emit('sendRequest')"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ProfileMainFormComponent from '../../forms/profile/ProfileMainFormComponent.vue';
import ProfileDocumentsFormComponent from '../../forms/profile/ProfileDocumentsFormComponent.vue';
import {IProfileDocs, ProfileDocsStatusEnum} from '../../../../entity/profileDocs/profileDocs.types';
import {ProfileDocumentsForm} from '../../../../form/profile/documents/profileDocumentsForm';
import InfoNote from '../../common/InfoNote.vue';
@Component({

  components: {InfoNote, ProfileDocumentsFormComponent, ProfileMainFormComponent}
})
export default class ProfileDocuments extends Vue {
  @Prop({required: true}) readonly docForm!: ProfileDocumentsForm;
  @Prop({required: true}) readonly docs!: IProfileDocs;
  statusName = ProfileDocsStatusEnum;
  showForm = false;

  open(): void {
    if (this.docs.status !== this.statusName.MODERATED) {
      this.showForm = !this.showForm;
    }
  }

  resolveStatus(): {color: string; statusName: string} {
    let color = '';
    let statusName = '';
    switch (this.docs.status) {
      case ProfileDocsStatusEnum.EMPTY: break;
      case ProfileDocsStatusEnum.ACCEPTED: color = '#27AE60'; statusName = 'Одобрено'; break;
      case ProfileDocsStatusEnum.MODERATED: color = '#F2994A'; statusName = 'Данные находятся в обработке'; break;
      case ProfileDocsStatusEnum.REJECTED: color = '#E64646'; statusName = 'Отклонено'; break;
    }
    return {color, statusName};
  }
}
</script>

<style lang="scss">
.full-doc {
  background: #FFFFFF;
  border: 1px solid rgba(87, 81, 183, 0.12);
  border-radius: 12px;
}
</style>
