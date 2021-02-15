<template>
  <div class="messages d-flex flex-column">
    <div class="message-container d-flex flex-column">
      <Task :progress="82" title="Курс как повысить звезду от Ильгиза  •  Урок 2" user-name="Руслан" :total="20"
            :right="18" date="Сегодня 17:06"/>
      <Task class="mt-3" :progress="75" title="Курс как повысить звезду от Ильгиза  •  Урок 2" user-name="Руслан"
            :total="20" :right="15" date="Сегодня 17:06"/>
      <div class="day d-flex align-center mt-4">
        <v-divider></v-divider>
        <span>22 Сентября</span>
        <v-divider></v-divider>
      </div>
      <Task class="mt-3" :progress="90" title="Курс как повысить звезду от Ильгиза  •  Урок 1" user-name="Руслан"
            :total="20" :right="19" date="17:06"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Task from '@/UI/components/task/Task.vue';

@Component({
  components: {Task}
})
export default class ChatTasks extends Vue {
}
</script>

<style lang="scss">
.day {
  font-size: 12px;
  color: #5F739C;

  span {
    padding: 4px 12px 4px 12px;
  }
}
</style>
