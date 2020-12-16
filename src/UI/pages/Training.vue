<template>
    <el-container class="container_a">
    <el-container class="ml-36 container_b">
      <el-col>
        <Header :isBordered="false" title="Обучение" ><Search/></Header>
        <SliderLeaders :leaders="leaders"/>
      </el-col>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "../components/common/Header.vue";
import SliderLeaders from "../components/slider/SliderLeaders.vue";
import Search from "../components/common/Search.vue";
import Leader from "@/entity/leader/leader";
import { LeaderResponseType } from "@/entity/leader/leader.types";
@Component({
    components: {
        SliderLeaders,
        Search,
        Header
    }
})
export default class Training extends Vue {
    leaders: Leader[] = [];
    constructor() {
        super();
        for (let i = 0; i < this.leader.length; i++) {
            this.leaders.push(new Leader(this.leader[i]));   
        }
    }
    leader: LeaderResponseType[] = [
        {
            id: 0,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 1,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 2,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 3,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 4,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 5,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 6,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 7,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 8,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 9,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 10,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        },
        {
            id: 11,
            name: 'Ivan',
            surname: 'Ivanov',
            master: 'Мастер вовлечения',
            rating: 10,
            img: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png'
        }
    ]
}
</script>
<style lang="scss">
    .top_bar {
        padding-left: 0;
        padding-right: 0;
    }
</style>