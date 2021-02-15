<template>
  <v-col class="events">
    <Header :isBordered="false" title="Кабинет лидера" class="top_bar_p_0"></Header>
    <v-row>
      <v-col>
        <FilterComponent :isOnRight="false" :filter="filters.periods" :defaultName="filters.defaultPeriod"/>
      </v-col>
    </v-row>
    <v-row class="badges pa-0">
      <Badge :subs="true" :profit="true">
        <template v-slot:title>Продажи (человек)</template>
        <template v-slot:default>26</template>
        <template v-slot:stats>6</template>
      </Badge>
      <Badge :profit="true">
        <template v-slot:title>Заработано</template>
        <template v-slot:default>{{ 637890 | currency('RUB') }}</template>
        <template v-slot:stats>5.3</template>
      </Badge>
      <Badge :profit="true">
        <template v-slot:title>Просмотров</template>
        <template v-slot:default>18771</template>
        <template v-slot:stats>12</template>
      </Badge>
      <Badge :profit="true">
        <template v-slot:title>Средняя оценка</template>
        <template v-slot:default>9.8</template>
        <template v-slot:stats>0.2</template>
      </Badge>
    </v-row>
    <v-col class="events__content">
      <v-row class="events__titles">
        <h3>Мои курсы</h3>
        <v-row class="events__myevents">
          <h3>Мои события</h3>
          <Button v-on="$listeners">Создать событие</Button>
        </v-row>
      </v-row>
      <v-row class="events__blocks">
        <div class="events__courses">
          <LeaderCourseItem
              v-for="(course, index) in courses"
              :key="index"
              :course="course"
              :leaderAvatar="'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'"
              :leaderFullName="'Руслан Хузин'"
              v-on="$listeners"
              @proceed="proceed"
          />
        </div>
        <v-col class="events__all">
          <EventItem
              v-for="(event, index) in events"
              :key="index"
              :event="event"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-col>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import FilterComponent from '@/UI/components/filter/FilterComponent.vue';
import Badge from '@/UI/components/common/Badge.vue';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import Filters from '@/entity/filters/filters';
import {LeaderResponseType} from '@/entity/leader';
import CoursesListItem from '@/entity/courses/courses';
import {CoursesListItemResponseType} from '@/entity/courses/courses.types';
import EventItem from '../../components/events/EventsItem.vue';
import {EventsResponseType} from '@/entity/events/events.types';
import EventsListItem from '@/entity/events/events';


@Component({
  components: {
    Header,
    FilterComponent,
    Badge,
    LeaderCourseItem,
    EventItem
  },
})

export default class Events extends Vue {
  filters: Filters;
  courses: CoursesListItem[] = [];
  events: EventsListItem[] = [];

  constructor() {
    super();
    this.filters = new Filters();

    for (let i = 0; i < this.coursesBack.length; i++) {
      this.courses.push(new CoursesListItem(this.coursesBack[i]));
    }

    for (let i=0; i< this.eventsBack.length; i++) {
      this.events.push(new EventsListItem(this.eventsBack[i]))
    }
  }

  proceed(id: number): void {
    this.$router.push({path: `/training/${id}/0`});
  }

  leader: LeaderResponseType =
      {
        id: 0,
        direction: 'dir',
        rating: '10',
        createdAt: '',
        updatedAt: '',
        userInfo: {
          id: 0,
          name: 'Ruslan',
          surname: 'Huzin',
          avatar:
              'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png',
        },
        courses: [
          {
            id: 0,
            title: 'jdkckdjc',
            description: 'gjhgk',
            isTestingRequire: true,
            createdAt: '',
          },
        ],
        balance: '',
        totalCoursesViewsCount: 10,
      };

  coursesBack: CoursesListItemResponseType[] = [
    {
      id: 0,
      title: '10 уроков на Салфетках',
      cover:
          'https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg',
      totalLesson: 20,
      lessonPassed: 7,
      duration: 2300,
      rating: 9.9,
    },
    {
      id: 1,
      title: 'Как усилить соц сети и создать поток из клиентов',
      cover:
          'https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg',
      totalLesson: 20,
      lessonPassed: 7,
      duration: 2300,
      rating: 9.2,
    },
    {
      id: 2,
      title: 'Как усилить соц сети и создать поток из клиентов',
      cover:
          'https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg',
      totalLesson: 20,
      lessonPassed: 15,
      duration: 2300,
      rating: 9.8,
    },
    {
      id: 3,
      title: 'Как увеличить конверсию живых встреч',
      cover:
          'https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg',
      totalLesson: 20,
      lessonPassed: 7,
      duration: 2300,
      rating: 9.9,
    },
  ];

  eventsBack: EventsResponseType[] = [
    {
      id: 0,
      title: 'Mi eu mauris, blandit enim. Quis ut egestas adipiscing arcu.',
      time: '14',
      dateOfBeginning: 'c 19:00 до 21:00',
      participants: [
        {
          id: 0,
          name: 'Руслан',
          surname: 'Хузин',
          avatar: 'https://pbs.twimg.com/media/EcZzOJbXgAEpndc.jpg'
        },
        {
          id: 1,
          name: 'Маргарита',
          surname: 'Иванова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 2,
          name: 'Павел',
          surname: 'Сидоров',
          avatar: 'https://pbs.twimg.com/media/EcZzOJbXgAEpndc.jpg'
        },
        {
          id: 3,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 4,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 5,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        }
      ]
    },
    {
      id: 1,
      title: 'Non tellus fringilla egestas justo tempor at.',
      time: '14',
      dateOfBeginning: 'c 19:00 до 22:00',
      participants: [
        {
          id: 0,
          name: 'Руслан',
          surname: 'Хузин',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 1,
          name: 'Маргарита',
          surname: 'Иванова',
          avatar: 'https://pbs.twimg.com/media/EcZzOJbXgAEpndc.jpg'
        },
        {
          id: 2,
          name: 'Павел',
          surname: 'Сидоров',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 3,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://pbs.twimg.com/media/EcZzOJbXgAEpndc.jpg'
        },
        {
          id: 4,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://pbs.twimg.com/media/EcZzOJbXgAEpndc.jpg'
        },
        {
          id: 5,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://pbs.twimg.com/media/EcZzOJbXgAEpndc.jpg'
        },
        {
          id: 6,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://pbs.twimg.com/media/EcZzOJbXgAEpndc.jpg'
        }
      ]
    },
    {
      id: 2,
      title: 'Leo tristique iaculis nec nam mi in dui quam.',
      time: '16',
      dateOfBeginning: 'c 19:00 до 22:00',
      participants: [
        {
          id: 0,
          name: 'Руслан',
          surname: 'Хузин',
          avatar: 'https://www.meme-arsenal.com/memes/be50e6ba99654b5455027dcc82beb5b3.jpg'
        },
        {
          id: 1,
          name: 'Маргарита',
          surname: 'Иванова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 2,
          name: 'Павел',
          surname: 'Сидоров',
          avatar: 'https://www.meme-arsenal.com/memes/be50e6ba99654b5455027dcc82beb5b3.jpg'
        },
        {
          id: 3,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 4,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 5,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
          id: 6,
          name: 'Екатерина',
          surname: 'Баланова',
          avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        }
      ]
    }
  ]
}
</script>

<style lang="scss">
.events {
  label {
    border: none
  }

  h1 {
    margin-bottom: 5px;
  }

  label {
    margin-left: 0;
    margin-bottom: 10px;
  }

  .badges {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .badge {
    margin-bottom: 0 !important;
    padding: 16px 0 8px 24px !important;
    background-color: #ffffff;

    &__stats {
      margin-bottom: 5px;
    }
  }

  &__titles {
    display: flex;
    justify-content: space-between;
    align-content: center;

    h3 {
      display: flex;
      align-items: center;
    }
  }

  .course-block {
    width: 100%;
    margin: 0;
  }

  .course-title {
    font-weight: 600;
    margin-top: 4px;
  }

  &__blocks {
    flex-wrap: nowrap;
  }

  &__content {
    margin-top: 39px;
  }

  &__courses {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-top: 29px;
    margin-right: 24px;
  }

  &__myevents {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    flex-basis: 37%;
    max-width: 356px;

    button {
      margin-top: 0;
      padding: 10px 16px;
    }
  }

  &__all {
    display: flex;
    flex-direction: column;
    margin-top: 29px;
    gap: 12px;
    padding: 0;
    flex-basis: 36.5%;
  }
}
</style>
