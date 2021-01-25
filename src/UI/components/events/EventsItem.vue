<template>
    <div class="event-block" @click="$emit('proceed', event.id)">
      <div class="event-block__date">
        <div class="event-block__mounth">ОКТ</div>
        <div class="event-block__number">{{ event.time }}</div>
      </div>
      <div class="event-block__content">
        <div class="event-block__title">
          {{ event.title }}
        </div>
        <div class="event-block__period">
          {{ event.dateOfBeginning }}
        </div>
        <div class="event-block__participants">
          <img class="event-block__participant"
               v-for="(participant, index) in event.participants"
               :key="index"
               :src="participant.avatar"
          />
        </div>
      </div>
    </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';
import EventsListItem from '@/entity/events/events';


@Component
export default class EventsItem extends Vue {
  @Prop() readonly event!: EventsListItem;
}

</script>

<style lang="scss">
.event-block {
  display: flex;
  border: 1px solid rgba(87, 81, 183, 0.12);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  max-height: 133px;

  &__date {
    color: #426DF6;
    margin-right: 20px;
  }

  &__month {
    text-align: center;
    font-size: 12px;
    line-height: 150%;
  }

  &__number {
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    font-weight: 600;
  }

  &__title {
    color: #060516;
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
  }

  &__period {
    color: #92929D;
    font-size: 14px;
    line-height: 160%;
    margin-bottom: 11px;
  }

  &__participants {
    display: flex;
    flex-wrap: nowrap;
  }

  &__participant {
    min-width: 32px;
    width: 32px;
    min-height: 32px;
    border-radius: 100%;
    margin-left: -6px;
    object-fit: cover;

    &:nth-child(1) {
      margin-left: 0;
    }
  }
}
</style>


