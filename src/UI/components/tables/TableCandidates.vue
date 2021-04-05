<template>
  <div>
    <div class="table" v-if="!$adaptive.isMobile">
      <div class="tr">
        <div></div>
        <div>Имя</div>
        <div>Номер телефона</div>
        <div>Почта</div>
        <div>Продукт</div>
        <div>Дата</div>
        <div></div>
      </div>
      <div :class="['tr tbody', candidate.callTime ? 'py-3' : '']" v-for="(candidate, index) in candidates" :key="index">
        <div class="status_select">
          <Select class-name="select_content" :selects="statuses" v-on="$listeners" :id="candidate.id">
            <template v-slot:act>
              <div class="d-flex flex-row">
                <v-img :src="candidate.status.photoLink" max-width="22" max-height="22"></v-img>
                <svg-icon name="Arrow_Down"></svg-icon>
              </div>
            </template>
            <template v-slot:action>
              <v-list-item class="selection" @click="$emit('addStatus')">
                <v-list-item-icon>
                  <svg-icon name="Add_Status"></svg-icon>
                </v-list-item-icon>
                <v-list-item-title class="status_action">Добавить статус</v-list-item-title>
              </v-list-item>
            </template>
          </Select>
        </div>
        <div class="name d-flex align-start justify-center flex-column">
          <div class="name_text">{{ candidate.name }}</div>
          <div class="call-time" v-if="candidate.callTime" @click="$emit('changeCallTime', {index: index, callTime: candidate.callTime})">Позвонить {{candidate.callTime}}</div>
        </div>
        <a class="link" :href="'tel:' + candidate.phoneNumber">{{ candidate.phoneNumber }}</a>
        <a class="email link" :href="'mailto:' + candidate.email">{{ candidate.email }}</a>
        <div class="product">{{candidate.infoPackName}}</div>
        <div>{{ candidate.createdAt }}</div>
        <div class="pr-0">
          <Select class-name="select_content action" :selects="selects" v-on="$listeners" :id="candidate.id">
            <template v-slot:act>
              <div class="d-flex justify-end pr-0">
                <svg-icon
                    name="Dots"
                >
                </svg-icon>
              </div>
            </template>
          </Select>
        </div>
      </div>
    </div>
    <div class="table mobile" v-else>
      <div class="tr tbody mb-3" v-for="(candidate, index) in candidates" :key="index">
        <div class="d-flex flex-row justify-space-between mb-3 pr-0">
          <div class="d-flex flex-row">
            <Select class-name="select_content" :selects="statuses" v-on="$listeners" :id="candidate.id">
              <template v-slot:act>
                <div class="d-flex flex-row">
                  <v-img :src="candidate.status.photoLink" max-width="22" max-height="22"></v-img>
                  <svg-icon name="Arrow_Down"></svg-icon>
                </div>
              </template>
              <template v-slot:action>
                <v-list-item class="selection" @click="$emit('addStatus')">
                  <v-list-item-icon>
                    <svg-icon name="Add_Status"></svg-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="status_action">Добавить статус</v-list-item-title>
                </v-list-item>
              </template>
            </Select>
            <div class="name d-flex flex-column align-start justify-center">
              <div class="name_text">{{ candidate.name }}</div>
              <div class="call-time" v-if="candidate.callTime" @click="$emit('changeCallTime', {index: index, callTime: candidate.callTime})">Позвонить {{candidate.callTime}}</div>
            </div>
          </div>
          <div class="pr-0">
            <Select class-name="select_content action" :selects="selects" v-on="$listeners" :id="candidate.id">
              <template v-slot:act>
                <div class="d-flex justify-end pr-0">
                  <svg-icon
                      name="Dots"
                  >
                  </svg-icon>
                </div>
              </template>
            </Select>
          </div>
        </div>
        <div class="mb-2">
          <div class="label">Номер телефона</div>
          <a class="link" :href="'tel:' + candidate.phoneNumber">{{ candidate.phoneNumber }}</a>
        </div>
        <div class="mb-2">
          <div class="label">Почта</div>
          <a class="email link" :href="'mailto:' + candidate.email">{{ candidate.email }}</a>
        </div>
        <div class="mb-2">
          <div class="label">Продукт</div>
          <div class="product">{{candidate.infoPackName}}</div>
        </div>
        <div>
          <div class="label">Дата</div>
          <div>{{ candidate.createdAt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

import Button from '@/UI/components/common/Button.vue';
import {Candidate} from '@/entity/candidates';
import {ISelect} from '@/entity/select/select.types';
import Select from '@/UI/components/common/Select.vue';
import {IStatuses} from '../../../entity/statuses/statuses.types';

@Component({
  components: {
    Select,
    Button,
  },
})
export default class TableCandidates extends Vue {
  @Prop() readonly candidates!: Candidate[];
  @Prop() readonly statuses!: IStatuses[];
  @Prop() readonly selects!: ISelect[];
}
</script>

<style lang="scss">

.select_content {
  margin-top: 30px !important;
  border-radius: 12px !important;
  min-width: 190px !important;
  max-height: 296px !important;
  &.action {
    #select0 {
      font-weight: 600;
    }

    #select2 {
      .v-list-item__title {
        color: #EB5757 !important;
      }
    }
  }
}
.status_action {
  color: #426DF6 !important;
}
</style>
