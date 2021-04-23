<template>
  <div>
    <div class="d-flex flex-column" >
      <div class="d-flex flex-column candidate-list mt-6" v-for="(candidate, index) in candidates" :key="index">
        <div class="candidate-list-title mb-2" @click="showList(index)"> <v-icon :class="{active: !listId.includes(index)}" class="chevron-down" color="#000">mdi-chevron-down</v-icon> {{index === today ? 'Сегодня' : index === yesterday ? 'Вчера' : index}}</div>
        
            <div class="candidates-list-item" :style="{display: !$adaptive.isMobile ? 'grid' : 'flex'}" v-show="!listId.includes(index)" :class="{activeList: listId.includes(index)}" v-on:mouseover="onHover" v-on:mouseout="onOutHover"  @click="setChosenCandidate(el.id)" v-for="(el, idx) in candidate" :key="idx">
              <div class="status_select">
                <Select class-name="select_content" :selects="statuses" v-on="$listeners" :id="el.id" style="{flex:1}">
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
              <div class="name d-flex align-start justify-center flex-column pl-1" style="flex:2">
                <div class="name_text" style="color:#101010; font-size:14px; font-weight: 500" >{{ el.name }}</div>
                <div class="captions" style="color:#5F739C; font-size:12px; line-hight: 1.5" v-if="el.callTime" @click="$emit('changeCallTime', {index: index, callTime: el.callTime})">Позвонить {{el.callTime}}</div>
                <div class="captions" style="color:#5F739C; font-size:12px; line-hight: 1.5"  v-else-if="el.status.id === 3" @click="$emit('changeCallTime', {index: index, callTime: el.callTime})">{{el.status.name}}</div>
                <div class="caption__origin" style="color:#5F739C; font-size:12px" v-else>{{el.status.name}}</div>
              </div>
              <a class="link" v-if="!$adaptive.isMobile" :href="'tel:' + el.phoneNumber" style="flex:2; font-size: 14px; color: #426DF6 !important;">{{ el.phoneNumber }}</a>
              <div style="flex:2" v-if="!$adaptive.isMobile">
                <div class="product">{{el.infoPackName}}</div>
              </div>
              <div class="pr-0 selects-dots">
                <Select class-name="select_content action" :selects="el.status.id === 4 ? newSelect : selects" v-on="$listeners" :id="el.id">
                  <template v-slot:act>
                    <div class="d-flex justify-end pr-0">
                      <v-icon class='icon-dots' color="#5F739C">mdi-dots-horizontal
                      </v-icon>
                    </div>
                  </template>
                </Select>
              </div>
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
import {MONTHS} from '../../../constants/month/index'

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
  archiveSelects: ISelect[] = [];
  isHover = false;
  isShowList = false;
  listId: null | number[] = [];
  today = `${new Date().getDate()} ${MONTHS.find(el => (new Date().getMonth() + 1).toString().includes(el.id.toString()))?.value}`;
  yesterday = `${new Date().getDate() - 1} ${MONTHS.find(el => (new Date().getMonth() + 1).toString().includes(el.id.toString()))?.value}`;


  get newSelect(): ISelect[] {
    for (let i = 0; i < this.selects.length; i++) {
      this.archiveSelects.push(this.selects[i]);
    }
    this.archiveSelects[this.archiveSelects.length - 1].name = 'Удалить кандидата'
    return this.archiveSelects;
  }

  setChosenCandidate(idx: number): void {
    this.$emit('choseCandidate', idx)
  }

  onHover(e: EventTarget):  void {
    this.isHover = true;
  }

  onOutHover(e: EventTarget): void {
    this.isHover = false;
  }

  showList(id: number): void {
    const idx = this.listId?.findIndex((el) => el === id)
    this.isShowList = !this.isShowList;

    if(this.listId?.includes(id)){
      this.listId.splice(idx!, 1);
      return

    }

    if(!this.listId?.includes(id)) {
      this.listId!.push(id);
      return;
    }
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
  cursor: pointer;

}

.icon-dots {
  &:hover {
    background: rgba(66, 109, 246, 0.12);
    border-radius: 4px;
  }
}

.selects-dots {
  opacity: 0;
  visibility: hidden;
  transition: opacity ease 200ms, visibility ease 200ms;
}

.active {
  transform: rotate(180deg);
}

.candidates-list-item {
  grid-template-columns: 50px 37% 25% 25% 5%;
  background: #FFFFFF;
  padding: 8px 16px;
  border: 1px solid #F2F2F2;
  align-items: center;
  transition: background-color ease-in-out  0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(87, 81, 183, 0.12);

    .selects-dots {
      opacity: 1;
      visibility: visible;
    }
  }

  &:nth-child(2) {
    border-radius: 4px 4px 0 0;
  }

  &:last-child{
    border-radius: 0px 0px 4px 4px;
  }
}
.captions {
  
}

</style>
