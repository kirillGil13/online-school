<template>
  <div class="d-flex flex-column candidate-item-detail" :class="[$adaptive.isMobile && 'mobile']" id="detail">
      <div class="d-flex candidate-item-detail__header">
          <div class="candidate-item-detail__header--title">{{item && item.name}}</div>
          <div class="candidate-item-detail__header--btn-header">
                <div class="pr-0 mr-4">
                    <Select class-name="select_content action" :selects="item && item.status.id === 4 ? newSelect : selects" v-on="$listeners" :id=" item && item.id">
                        <template v-slot:act>
                            <v-icon color="#5F739C">mdi-dots-horizontal</v-icon>
                        </template>
                    </Select>
                </div>
                <button @click="closeDialogForm" class="btn-close"><v-icon color="#5F739C">mdi-close</v-icon></button>
          </div>

      </div>
      <div class="candidate-item-detail__status mt-5">
            <div class="candidate-item-detail__status--title mb-1">Статус</div>
            <div class="candidate-item-detail__status--select">
                <Select class-name="select_content" :selects="statuses" v-on="$listeners" :id="item && item.id" style="flex:1">
                    <template v-slot:act>
                        <div class="d-flex flex-row align-center">
                            <v-img :src="item && item.status.photoLink" max-width="22" max-height="22"></v-img>
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

                <div class="d-flex align-start justify-center flex-column ml-3">
                    <div v-if="item && item.callTime" style="font-size: 16px; color: #101010; cursor: pointer" @click="$emit('candidateChangeCallTimeDetails', item.id)">Позвонить {{item.callTime}}</div>
                    <div style="font-size: 16px; color: #101010; cursor: pointer" v-else-if="item && item.status.id === 3" @click="$emit('candidateChangeCallTimeDetails', item.id)">{{item && item.status.name}}</div>
                    <div style="font-size: 16px; color: #101010;" v-else>{{ item && item.status.name}}</div>
                </div>
            </div>
        </div>
        <div class="candidate-item-detail__product mt-2" >
            <div class="candidate-item-detail__product--title">Продукт</div>
            <div class="candidate-item-detail__product--info">{{item && item.infoPackName ? item.infoPackName : 'Нет данных'}}</div>
        </div>

         <div class="candidate-item-detail__phone mt-2">
            <div class="candidate-item-detail__phone--title">Номер телефона</div>
            <div class="candidate-item-detail__phone--info">
                <a :href="'tel:' + (item && item.phoneNumber)" style="font-size: 16px; color: #426DF6 !important;">
                    {{item && item.phoneNumber}}
                </a>
            </div>
        </div>

        <div class="candidate-item-detail__email mt-2">
            <div class="candidate-item-detail__email--title">Email</div>
            <div class="candidate-item-detail__email--info" :style="{color: item && item.email ? '#426DF6 !important' : '#101010 !important' }">{{item && item.email ? item.email : 'Нет данных'}}</div>
        </div>

        <div class="candidate-item-detail__data mt-2">
            <div class="candidate-item-detail__data--title">Дата добавления</div>
            <div class="candidate-item-detail__data--info">{{item && getTime(item.createdAt)}}</div>
        </div>

        <div class="candidate-item-detail__notes mt-2">
            <div class="candidate-item-detail__notes--title">Заметки</div>
            <div class="candidate-item-detail__notes--info">
                <v-textarea
                    v-model="getDescription"
                    dense
                    auto-grow
                    id="notes"
                    filled
                    placeholder="Нажмите, чтобы добавить заметку"
                    rows="1"
                    hide-details
                    class="notes-field"
                ></v-textarea>
            </div>
            <div class="candidate-item-detail__notes--btn-add">
                <Button small class="btn-add-note" :disabled=" (item && getDescription.length === 0) ||  /^\s*$/.test(getDescription)" @submit="$emit('updateNote', {note: getDescription, id: item.id})">
                    Сохранить
                </Button>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import Button from '@/UI/components/common/Button.vue';
import {ICandidate} from '@/entity/candidates/candidates.types';
import {MONTHS} from '../../../constants/month/index';
import {IStatuses} from '../../../entity/statuses/statuses.types';
import Select from '@/UI/components/common/Select.vue';
import {ISelect} from '@/entity/select/select.types';

@Component({
    components: {
        Button,
        Select
    }
})
export default class CandidateItemDetail extends Vue {
    @Prop() readonly item!: ICandidate;
    @Prop() readonly statuses!: IStatuses[];
    @Prop() readonly indexCandidate!: number;
    @Prop() readonly selects!: ISelect[];
    archiveSelects: ISelect[] = [];

    get getDescription(): string {
        if(this.item && this.item.description) {
            return this.item.description
        }else {
            return ''
        }
    }

    set getDescription(value: string) {
        this.item.description = value
    }

    get newSelect(): ISelect[] {
        for (let i = 0; i < this.selects.length; i++) {
            this.archiveSelects.push(this.selects[i]);
        }
        this.archiveSelects[this.archiveSelects.length - 1].name = 'Удалить кандидата'
        return this.archiveSelects;
    }

    mounted(): void {
      const detail = document.getElementById('detail');
      window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop >= 235 && !detail!.classList.contains('scrolled') && !this.$adaptive.isMobile) {
          detail!.classList.add('scrolled');
        } else if (document.documentElement.scrollTop < 235) {
          detail!.classList.remove('scrolled');
        }
      })
    }

    getTime(data: string): string {
        const dataInfo = data.split('.')

        const month = MONTHS.find(el => data && dataInfo[1].split(',')[0].includes(el.id.toString()))

        return dataInfo[0] + ' ' +  month?.value + ',' + dataInfo[1].split(',')[1];
    }

    closeDialogForm(): void {
        this.$emit('closeCandidateItemDetail');
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

.candidate-item-detail {
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    width: 100%;
    padding: 16px;
    flex-direction: column;
  &.scrolled {
    position: fixed !important;
    top: 30px;
    max-width: 318px !important;
  }


    &__header {
        display: flex;
        width: 100%;

        &--title {
            flex: 2;
            color: #101010;
            font-size: 18px;
            line-height: 24px;
            font-weight: bold;
        }

        &--btn-header {
            flex: 1;
            display: flex;
            justify-content: flex-end;

            .btn-more {


                width: 24px;
                height: 24px;
            }

            .btn-close {
                background: none;
                width: 24px;
                margin: 0;
                padding: 0;
                height: 24px;
            }
        }
    }

    &__status {
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;

        &--title {
            font-size: 12px;
            color: #5F739C
        }

        &--select {
            display: flex;
        }

    }

    &__product {
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;

        &--title {
            font-size: 12px;
            color: #5F739C
        }

        &--info {
            margin-top: 4px;
            font-size: 16px;
            color: #101010;
            background-color: transparent !important;
        }
    }

    &__phone {
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;

        &--title {
            font-size: 12px;
            color: #5F739C
        }

        &--info {
            margin-top: 4px;
            font-size: 16px;
            color: #426DF6 !important;
            cursor: pointer;

        }
    }

    &__email {
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;

        &--title {
            font-size: 12px;
            color: #5F739C
        }

        &--info {
            margin-top: 4px;
            font-size: 16px;
            color: #101010;
        }
    }

    &__data {
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;

        &--title {
            font-size: 12px;
            color: #5F739C
        }

        &--info {
            margin-top: 4px;
            font-size: 16px;
            color: #101010;
        }
    }

    &__notes {
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;

        &--title {
            font-size: 12px;
            color: #5F739C
        }

        &--info {
            margin-top: 4px;
            font-size: 16px;
            color: #101010;
            background-color: #fff;

            .notes-field {
                background-color: #fff  !important;
                .v-input__slot::before {
                    border-style: none !important;
                }

                .v-input__slot {
                    background-color: #fff !important;
                    padding: 0 !important;
                }

                .v-input__slot::after {
                    border-style: none !important;
                }
            }
        }

        &--btn-add {

            .btn-add-note {

                &:disabled {
                    background-color: #F4F6F9;
                }
            }
        }
    }
}
</style>
