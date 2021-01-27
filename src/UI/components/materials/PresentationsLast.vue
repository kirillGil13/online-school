<template>
  <div class="presentations__new">
    <PresentationComponent
    v-for="(presentation, index) in presentations"
    :key="index"
    :presentation="presentation"
    />
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import PresentationComponent from '../presentation/PresentationComponent.vue';
// import {PresentationsListItemResponseType} from '@/entity/presentations/presentations.types';
import PresentationsListItem from '@/entity/presentations/presentations';


@Component({
  components: {
    PresentationComponent
  }
})

export default class PresentationsLast extends Vue {
  @Prop() readonly presentations!: PresentationsListItem[];

  /*presentations: PresentationsListItem[] = [];

  constructor() {
    super();

    for (let i = 0; i < this.presentationsBack.length; i++) {
      this.presentations.push(new PresentationsListItem(this.presentationsBack[i]));
    }
  }

  presentationsBack: PresentationsListItemResponseType[] = [
    {
      id: 0,
      title: 'Eget dolor quis a.',
      image: 'https://i.pinimg.com/originals/8b/e9/e1/8be9e1c438dff0c78ac2f264817a7bc6.jpg'
    },

    {
      id: 1,
      title: 'Eget dolor quis a.',
      image: 'https://i.pinimg.com/originals/8b/e9/e1/8be9e1c438dff0c78ac2f264817a7bc6.jpg'
    },

    {
      id: 2,
      title: 'Eget dolor quis a.',
      image: 'https://i.pinimg.com/originals/8b/e9/e1/8be9e1c438dff0c78ac2f264817a7bc6.jpg'
    },

    {
      id: 3,
      title: 'Eget dolor quis a.',
      image: 'https://i.pinimg.com/originals/8b/e9/e1/8be9e1c438dff0c78ac2f264817a7bc6.jpg'
    },
  ]*/
}
</script>

<style lang="scss">
.presentations {
  &__new {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-top: 13px;
  }
}
</style>
