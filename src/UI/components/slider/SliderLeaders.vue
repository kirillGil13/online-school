<template>
    <v-col class="slider-container">
        <swiper class="swiper component" :options="swiperComponentOption" ref="swiper">
            <swiper-slide v-for="(leader, index) in leaders" :key="index" :id="index">
                <router-link :to="{ name: 'leaderCourses', params: { id: leader.id } }" active-class="active_leader">
                    <div class="leader-photo" :style="{ backgroundImage: 'url(' + leader.userInfo.avatar + ')' }">
                        <Rating :rating="leader.rating" class="master-rating" />
                    </div>
                    <h4>{{ leader.fullName }}</h4>
                    <span class="desc">{{ leader.direction }}</span>
                </router-link>
            </swiper-slide>
            <div class="swiper-button-prev" @click="prev()" slot="button-prev">
                <svg-icon name="Slider_Arrow"></svg-icon>
            </div>
            <div class="swiper-button-next" @click="next()" slot="button-next">
                <svg-icon name="Slider_Arrow"></svg-icon>
            </div>
        </swiper>
    </v-col>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Rating from '../common/Rating.vue';
import Leader from '@/entity/leader/leader';
import { SwiperOptions } from 'swiper';

@Component({
    components: {
        Rating,
    },
})
export default class SliderLeaders extends Vue {
    @Prop() readonly leaders!: Leader[];

    swiperComponentOption: SwiperOptions = {
        slidesPerView: 6,
        spaceBetween: 8,
        slidesPerGroup: 1,
        loop: false,
        navigation: {
            nextEl: 'swiper-button-next',
            prevEl: 'swiper-button-prev',
        },
        simulateTouch: false,
    };

    next(): void {
        // this.$refs.swiper.$swiper.slideNext();
        this.checkActive();
    }

    prev(): void {
        // this.$refs.swiper.$swiper.slidePrev();
        this.checkActive();
    }

    checkActive(): void {
        
        // if (this.$refs.swiper.$swiper.activeIndex != 0) {
        //     this.$refs.swiper.$swiper.params.el.children[1].style.display = 'flex';
        // } else this.$refs.swiper.$swiper.params.el.children[1].style.display = 'none';
    }
}
</script>
<style lang="scss">
.swiper {
    width: 90%;
    position: static;
}

.swiper-wrapper {
    position: static;
}

.slider-container {
    position: relative;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    cursor: pointer;
    &:nth-child(1) {
        margin-left: 5px;
    }
    a {
        border-radius: 12px;
        padding-top: 16px;
        padding-bottom: 16px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .leader-photo {
            width: 72px;
            height: 72px;
            position: relative;
            background-repeat: no-repeat;
            background-size: cover;
            border: 1px solid rgba(0, 0, 0, 0.04);
            border-radius: 50%;

            .rating {
                left: 25%;
                bottom: -10%;
            }
        }

        h4 {
            color: #060516;
            font-size: 12px;
            margin-top: 8px;
            margin-bottom: 0;
            line-height: 150%;
        }

        .desc {
            color: #060516;
            opacity: 0.6;
            font-size: 12px;
            line-height: 150%;
        }
    }
}

.swiper-button-prev,
.swiper-button-next {
    $size: 2.4rem;
    width: $size;
    height: $size;
    margin-top: -($size / 2);
    border-radius: 100%;
    background: linear-gradient(180deg, #4f79ff 0%, #2150e7 100%);

    .iconfont {
        color: #ffffff;
        transform: rotate(180deg);
    }

    &::after {
        content: none;
    }
}

.swiper-button-prev {
    display: none;

    .svg-icon {
        transform: rotate(180deg);
    }
}

.swiper-button-next {
    display: flex;
}

.master-rating {
    background: linear-gradient(180deg, #f2cd4a 0%, #ff6d1b 100%);
    backdrop-filter: blur(4px);
}

.active_leader {
    border: 2px solid #426df6;
}
</style>
