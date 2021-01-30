<template>
  <v-col>
    <h3>Топ лидеры компании</h3>
    <div class="companies__leaders">
      <LeaderAvatar
          v-for="(leader, index) in leaders"
          :key="index"
          :leader="leader"
      />
    </div>
  </v-col>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import LeaderAvatar from '@/UI/components/leader/LeaderAvatar.vue';
import {ILeader} from '@/entity/leader';

@Component({
  components: {
    LeaderAvatar
  }
})

export default class CompanyLeaders extends Vue {
  @Prop() readonly leaders!: ILeader[];
}
</script>
<style lang="scss">
.companies {
  &__leaders {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: 16px;
    margin-top: 16px;
  }
}
</style>
