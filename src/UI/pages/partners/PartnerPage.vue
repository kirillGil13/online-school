<template>
  <v-row class="profile">
    <v-col :cols="12">
      <div class="profile__main-content">
        <v-row>
          <v-col class="pt-0" :cols="$adaptive.isMobile ? 12 : 2">
            <div
                :class="{
                            'profile__info-full-size': !$adaptive.isMobile,
                            'profile__info-low-size': $adaptive.isMobile,
                        }"
            >
              <avatar
                  :size="!$adaptive.isMobile ? 143 : 70"
                  :starSize="AvatarSizeEnum.MEDIUM"
                  :avatar-size="AvatarSizeEnum.MEDIUM"
                  :image-source="''"
                  :id="0"
              />
              <div class="badges">
                <Badge :subs="true">
                  <template v-slot:title>Подписка</template>
                  <template v-if="true" v-slot:sub>Оформлена</template>
                  <template v-else v-slot:sub>Не оформлена</template>
                </Badge>
                <Badge>
                  <template v-slot:title>Партнеров</template>
                  <template v-slot:default>18</template>
                </Badge>
                <Badge>
                  <template v-slot:title>Переходов</template>
                  <template v-slot:default>291</template>
                </Badge>
              </div>

              <Button class="btn secondary_blue py-3 mt-2">Написать</Button>
            </div>
          </v-col>
          <v-col class="pa-0">
            <Header title="Петров Иван Сергеевич"></Header>
            <v-col class="border-box px-6 py-4 mt-4">
              <h4>Контактная информация</h4>
              <v-row class="main-info d-flex flex-row justify-start flex-nowrap" no-gutters>
                <div class="labels d-flex flex-column">
                  <div class="mt-3">
                    <label>Телефон:</label>
                    <div>+7 (937) 928-11-02</div>
                  </div>
                  <div class="mt-2">
                    <label >Email:</label>
                    <div>mail@mail.ru</div>
                  </div>
                  <div class="mt-2">
                    <label >Логин в Skype:</label>
                    <div>ivanya</div>
                  </div>
                  <div class="mt-2">
                    <label >Страница ВКонтакте:</label>
                    <a href="#" >vk.com/larisa_pro</a>
                  </div>
                  <div class="show mt-2" @click="show = true" v-if="!show">Показать полностью</div>
                  <div class="d-flex flex-column" v-else>
                    <div class="mt-2">
                      <label >Страница Instagram:</label>
                      <a href="#" >instagram.com/larisa_pro</a>
                    </div>
                    <div class="mt-2">
                      <label >Finiko School ID:</label>
                      <a href="#" >instagram.com/larisa_pro</a>
                    </div>
                    <div class="mt-2">
                      <label >Партнерская ссылка</label>
                      <a href="#" >finikoschool.com/max100500</a>
                    </div>
                    <div class="mt-2">
                      <label>Партнерская ссылка на thefiniko.com:</label>
                      <a href="#">thefiniko.com/max100500</a>
                    </div>
                    <div class="mt-2">
                      <label>О себе:</label>
                      <div>ivanya</div>
                    </div>
                  </div>
                </div>
              </v-row>
            </v-col>
            <v-col class="profile__detail-info-container px-6 pt-4 pb-6 mt-3" :cols="$adaptive.isMobile ? 10 : 12">
              <div class="grid-content">
                <v-row>
                  <v-col cols="12" class="profile__col">
                    <v-tabs show-arrows class="mb-2" color="#426DF6" v-model="activeName">
                      <v-tabs-slider color="#426DF6"></v-tabs-slider>
                      <v-tab>
                        Действия партнера
                      </v-tab>
                      <v-tab>
                        Общие
                      </v-tab>
                      <v-tab>
                        Обучение
                      </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="activeName">
                      <v-divider></v-divider>
                      <v-tab-item>
                        <keep-alive>
                          <PartnerActions/>
                        </keep-alive>
                      </v-tab-item>
                      <v-tab-item>
                        <keep-alive>
                          <PartnerCommon/>
                        </keep-alive>
                      </v-tab-item>
                      <v-tab-item>
                        <keep-alive>
                          <PartnerTraining/>
                        </keep-alive>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Badge from '@/UI/components/common/Badge.vue';
import Avatar from '@/UI/components/common/Avatar.vue';
import Button from '@/UI/components/common/Button.vue';
import {AvatarSizeEnum} from '@/entity/common/avatar.types';
import Header from '@/UI/components/common/Header.vue';
import {IPartner} from '../../../entity/partners';
import {PartnersStore} from '../../../store/modules/Partners';
import PartnerActions from '../../components/partner/PartnerActions.vue';
import PartnerTraining from '../../components/partner/PartnerTraining.vue';
import PartnerCommon from '../../components/partner/PartnerCommon.vue';

@Component({
  components: {
    PartnerCommon,
    PartnerTraining,
    PartnerActions,
    Badge,
    Avatar,
    Button,
    Header,
  },
})
export default class PartnerPage extends Vue {

  show = false;
  success = false;
  activeName = 0;
  AvatarSizeEnum = AvatarSizeEnum;

  get partners(): IPartner[] {
    return PartnersStore.partners;
  }

  async created(): Promise<void> {
    await PartnersStore.fetchAll();
  }
}
</script>

<style lang="scss">
.profile {
  .badges {
    margin-top: 24px;
  }

  &__main-content {
    border-radius: $main_border_radius;
    background-color: $white;
    padding: 36px 36px 36px 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .main-info {
      .labels {
        div {
          display: flex;
          flex-direction: row;
          label {
            margin-left: 0;
            margin-right: 24px;
            width: 150px;
          }
          a {
            font-size: 14px;
            text-decoration: underline;
          }
        }
        .show {
          color: #426DF6;
          cursor: pointer;
        }
      }
    }
  }

  .btn {
    font-size: 12px;
    width: 100%;
  }

  &__singout-button {
    background-color: rgba(66, 109, 246, 0.12) !important;
    border-radius: $main_border_radius;
    color: $blue;
    width: 144px;
    max-height: 50px;
  }

  &__col {
    padding: 10px;

    .v-tab {
      font-size: 14px !important;
      text-transform: none !important;
      letter-spacing: normal !important;
    }

  }

  &__info-full-size {
    width: 144px;
  }

  &__info-low-size {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__detail-info-container {
    border: 1px solid rgba(66, 109, 246, 0.12);
    border-radius: $main_border_radius;

    label {
      border: none !important;
    }
  }
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
}

.grid-conten {
  min-height: 32px;
}
</style>
