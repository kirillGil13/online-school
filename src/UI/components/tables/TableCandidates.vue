<template>
    <div class="table">
        <div class="tr">
            <div></div>
            <div>Имя</div>
            <div>Номер телефона</div>
            <div>Почта</div>
            <div>Видео</div>
            <div>Дата</div>
            <div></div>
        </div>
        <div class="tr tbody" v-for="(candidate, index) in candidates" :key="index">
            <div>
              <Select :selects="selects[0]">
                <template v-slot:act>
                  <div class="d-flex flex-row">
                    <svg-icon
                        :name="candidate.status"
                    >
                    </svg-icon>
                    <svg-icon name="Arrow_Down"></svg-icon>
                  </div>
                </template>
              </Select>
            </div>
            <div>{{ candidate.name }}</div>
            <div class="link">{{ candidate.phone }}</div>
            <div class="email link">{{ candidate.email }}</div>
            <div class="product">Недвижимость за 35%</div>
            <div>{{ candidate.createdAt | moment('DD.MM, HH:mm') }}</div>
            <div>
              <Select :selects="selects[1]">
                <template v-slot:act>
                  <div class="d-flex justify-end">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Button from '@/UI/components/common/Button.vue';
import { Candidate } from '@/entity/candidates';
import {ISelect} from '@/entity/select/select.types';
import Select from '@/UI/components/common/Select.vue';

@Component({
    components: {
      Select,
        Button,
    },
})
export default class TablePartners extends Vue {
    @Prop() readonly candidates!: Candidate[];
    @Prop() readonly selects!: ISelect[];
}
</script>

<style lang="scss" scoped>
.email {
  line-height: 80%;
}
.video-container{
  width: 70%;
  margin-left: 10%;
}
</style>
