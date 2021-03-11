<template>
  <v-col :class="['slider-container', isMobile ? 'pa-0' : '']">
    <swiper :class="['swiper component', isMobile ? 'mx-0' : '']" :options="swiperComponentOption" ref="swiper">
      <swiper-slide v-for="(leader, index) in leaders" :key="index" :id="index">
        <div :class=" ['slide', $route.params.id === leader.id.toString() ? 'active_leader' : '' ]">
          <div class="leader-photo" :style="{ backgroundImage: 'url(' + leader.photoLink + ')' }">
            <Rating v-if="leader.rating" :rating="leader.rating" class="master-rating"/>
          </div>
          <h4>{{ leader.fullName }}</h4>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" @click="prev()" slot="button-prev" v-if="!isMobile">
        <svg-icon name="Slider_Arrow"></svg-icon>
      </div>
      <div class="swiper-button-next" @click="next()" slot="button-next" v-if="!isMobile">
        <svg-icon name="Slider_Arrow"></svg-icon>
      </div>
    </swiper>
  </v-col>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Rating from '../common/Rating.vue';
import {SwiperOptions} from 'swiper';
import {AdaptiveStore} from '@/store/modules/Adaptive';
import {ILeadersListItem} from '../../../entity/leader';

@Component({
  components: {
    Rating,
  },
})
export default class SliderLeaders extends Vue {
  @Prop() readonly leaders!: ILeadersListItem[];

  swiperComponentOption: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 8,
    loop: false,
    navigation: {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev',
    },
  };

  proceed(id: number): void {
    this.$router.push({ name: this.$routeRules.LeaderCourses, params: { id: id.toString() } });
  }

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
  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }
}
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
  position: static;
}

.swiper-wrapper {
  position: static;
}

.slider-container {
  position: relative;
  margin-bottom: 34px;
}

.swiper-slide {
  width: 150px;
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

  .slide {
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
  //display: none;

  .svg-icon {
    transform: rotate(180deg);
  }
}

.swiper-button-next {
  display: flex;
}

.master-rating {
  background: linear-gradient(180deg, #f2cd4a 0%, #ff6d1b 100%) !important;
  backdrop-filter: blur(4px) !important;
}

.active_leader {
  border: 2px solid #426df6;
}
</style>
