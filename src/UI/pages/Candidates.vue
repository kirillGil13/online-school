<template>
  <v-container>
      <v-col>
        <Header :isBordered="false" title="Кандидаты" class="top_bar_p_0"
                description="Здесь отображаются контактные данные всех людей, которые регистрировались по Вашим партнерским ссылкам">
        </Header>
        <v-col class="link-bar">
          <div class="link-container">
            <div>Ваша ссылка на лендинг</div>
            <div class="link-content">
              <div class="link">https://onelinks.com/ruslan_huzin</div>
              <svg-icon name="Copy"></svg-icon>
            </div>
          </div>
          <Search/>
        </v-col>
        <v-col>
          <TableCandidates :candidates="candidates"/>
        </v-col>
      </v-col>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import Search from '@/UI/components/common/Search.vue';
import TableCandidates from '@/UI/components/tables/TableCandidates.vue';
import CandidatesItem from '@/entity/candidates/candidates';
import {CandidatesResponseType} from '@/entity/candidates/candidates.types';

@Component({
  components: {
    Header,
    Search,
    TableCandidates
  }
})
export default class Candidates extends Vue {
  candidates: CandidatesItem[] = [];
  constructor() {
    super();
    for (let i = 0; i < this.candidatesTemp.length; i++) {
      this.candidates.push(new CandidatesItem(this.candidatesTemp[i]));
    }
  }
  candidatesTemp: CandidatesResponseType[] = [
    {
      id: 0,
      name: 'Ренат Мингазов',
      phone: '+7 (927) 999-00-66',
      email: 'mail@mymail.com',
      createdAt: '22.09, 18:21'
    },
    {
      id: 1,
      name: 'Ренат Мингазов',
      phone: '+7 (927) 999-00-66',
      email: 'mail@mymail.com',
      createdAt: '22.09, 18:21'
    }
  ]
}
</script>

<style lang="scss">
.link-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .link-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    .link-content {
      margin-left: 12px;
      padding: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #FFFFFF;
      border: 1px solid #ECECEC;
      box-shadow: 0px 14px 12px rgba(0, 0, 0, 0.01);
      border-radius: 8px;
      .link {
        color: #426DF6;
        font-size: 16px;
        padding: 0 8px 0 8px;
        background: rgba(66, 109, 246, 0.12);
        border-radius: 4px;
      }
      svg {
        cursor: pointer;
        margin-left: 8px;
        width: 20px !important;
        height: 20px !important;
        fill: #426DF6;
      }
    }
  }
  .search {
    width: 32.5%;
  }
}
</style>
