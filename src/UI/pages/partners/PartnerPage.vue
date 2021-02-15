<template>
  <v-row class="profile">
    <v-col :cols="12">
      <Header class="mb-3" title="Петров Иван"></Header>
    </v-col>
    <v-col :cols="12">
      <div class="profile__main-content">
        <v-row>
          <v-col class="pt-0" :cols="isMobile ? 12 : 2">
            <div
                :class="{
                            'profile__info-full-size': !isMobile,
                            'profile__info-low-size': isMobile,
                        }"
            >
              <avatar
                  :size="!isMobile ? 143 : 70"
                  :imageSourse="'https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg'"
                  :starSize="AvatarSizeEnum.MEDIUM"
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
                  <template v-slot:title>Был на сайте</template>
                  <template v-slot:default>Сегодня, 17:20</template>
                </Badge>
              </div>

              <Button class="btn secondary_blue py-3 mt-2">Написать</Button>
            </div>
          </v-col>
          <v-col class="profile__detail-info-container pa-6" :cols="!isMobile ? 10 : 12">
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
import {AdaptiveStore} from '@/store/modules/Adaptive';

@Component({
  components: {
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

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
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
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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

label {
  border: none !important;
}

.input {
  padding: 12px 16px 12px 16px;
  border-style: solid;
  border-radius: 5px 0 0 5px;

  &__normal {
    border-radius: 5px;
  }
}
</style>
