<template>
  <div>
    <div class="d-flex flex-column" >
      <div class="d-flex flex-column candidate-list mt-6" v-for="(candidate, index) in candidates" :key="index">
        <div class="candidate-list-title mb-1"> <v-icon color="#000">mdi-chevron-down</v-icon> {{index}}</div>
        <div class="candidates-list-item" v-for="(el, idx) in candidate" :key="idx">
          <div class="status_select ">
            <Select class-name="select_content" :selects="statuses" v-on="$listeners" :id="el.id" style="flex:1">
              <template v-slot:act>
                <div class="d-flex flex-row align-center">
                  <v-img :src="el.status.photoLink" max-width="22" max-height="22"></v-img>
                  <svg-icon class="ml-1" name="Arrow_Down"></svg-icon>
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
          <div class="name d-flex align-start justify-center flex-column" style="flex:2">
            <div class="name_text" style="color:#101010; font-size:14px; font-weight: 500" >{{ el.name }}</div>
            <div class="caption" v-if="el.callTime" @click="$emit('changeCallTime', {index: index, callTime: el.callTime})">Позвонить {{el.callTime}}</div>
            <div class="caption"  v-else-if="el.status.id === 3" @click="$emit('changeCallTime', {index: index, callTime: el.callTime})">{{el.status.name}}</div>
            <div class="caption__origin" style="color:#5F739C; font-size:12px" v-else>{{el.status.name}}</div>
          </div>
          <a class="link" :href="'tel:' + el.phoneNumber" style="flex:2">{{ el.phoneNumber }}</a>
          <div style="flex:2">
            <div class="product">{{el.infoPackName}}</div>
          </div>
        </div>
      </div>
      <!-- <div class="tr">
        <div></div>
        <div>Имя</div>
        <div>Номер телефона</div>
        <div>Почта</div>
        <div>Продукт</div>
        <div>Дата</div>
        <div></div>
      </div>
      <div class="tr tbody py-3" v-for="(candidate, index) in candidates" :key="index">

        
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
          <div class="caption" v-if="candidate.callTime" @click="$emit('changeCallTime', {index: index, callTime: candidate.callTime})">Позвонить {{candidate.callTime}}</div>
          <div class="caption" v-else-if="candidate.status.id === 3" @click="$emit('changeCallTime', {index: index, callTime: candidate.callTime})">{{candidate.status.name}}</div>
          <div class="caption__origin" v-else>{{candidate.status.name}}</div>
        </div>
        <a class="link" :href="'tel:' + candidate.phoneNumber">{{ candidate.phoneNumber }}</a>
        <a class="email link" :href="'mailto:' + candidate.email">{{ candidate.email }}</a>
        <div class="product">{{candidate.infoPackName}}</div>
        <div>{{ candidate.createdAt }}</div>
        <div class="pr-0">
          <Select class-name="select_content action" :selects="candidate.status.id === 4 ? newSelect : selects" v-on="$listeners" :id="candidate.id">
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
              <div class="caption" v-if="candidate.callTime" @click="$emit('changeCallTime', {index: index, callTime: candidate.callTime})">Позвонить {{candidate.callTime}}</div>
              <div class="caption" v-else-if="candidate.status.id === 3" @click="$emit('changeCallTime', {index: index, callTime: candidate.callTime})">{{candidate.status.name}}</div>
              <div class="caption__origin" v-else>{{candidate.status.name}}</div>
            </div>
          </div>
          <div class="pr-0">
            <Select class-name="select_content action" :selects="candidate.status.id === 4 ? newSelect : selects" v-on="$listeners" :id="candidate.id">
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
      </div> -->
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
  archiveSelects: ISelect[] = []

  get newSelect(): ISelect[] {
    for (let i = 0; i < this.selects.length; i++) {
      this.archiveSelects.push(this.selects[i]);
    }
    this.archiveSelects[this.archiveSelects.length - 1].name = 'Удалить кандидата'
    return this.archiveSelects;
  }
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
      .v-list-item__title {
        font-weight: bold !important;
      }
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
.candidate-list-title {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 170%;
  display: flex;
  align-items: center;
  color: #101010;
}

.candidates-list-item {
  display: grid;
  grid-template-columns: 5% 40% 25% 25% 5%;
  background: #FFFFFF;
  padding: 8px 16px;
  border: 1px solid #F2F2F2;
  align-items: center;

   &:nth-child(2) {
    border-radius: 4px 4px 0 0;
  }

  &:last-child{
    border-radius: 0px 0px 4px 4px;
  }
}
</style>
