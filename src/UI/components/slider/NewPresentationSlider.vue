<template>
  <div class="slider-container">
    <swiper class="swiper" :options="swiperComponentOption" ref="swiper">
      <swiper-slide v-for="(presentation, index) in presentations" :key="index" :id="index">
        <div class="slide">
          <v-img class="img" :aspect-ratio="16/9" width="100%" :src="presentation.cover">
          </v-img>
          <div class="format_icon">
            <svg-icon v-if="presentation.fileType === 'pdf'" name="Doc_PDF"></svg-icon>
          </div>
          <div class="slider-description">
            <h4>{{ presentation.name }}</h4>
            <span class="desc">{{ presentation.fileSize }} kb</span>
          </div>

        </div>
      </swiper-slide>
      <div class="swiper-button-prev" @click="prev()" slot="button-prev">
        <svg-icon name="Slider_Arrow"></svg-icon>
      </div>
      <div class="swiper-button-next" @click="next()" slot="button-next">
        <svg-icon name="Slider_Arrow"></svg-icon>
      </div>
    </swiper>
  </div>

</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {SwiperOptions} from 'swiper';
import {IPresentationType} from "@/entity/materials/presentations/presentation.types";

@Component
export default class NewPresentationSlider extends Vue {
  @Prop() readonly presentations!: IPresentationType[];

  swiperComponentOption: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 8,
    slidesPerGroup: 1,
    loop: false,
    preloadImages: true,
    navigation: {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev',
    },
    simulateTouch: false,
  };


  next(): void {
    this.$refs.swiper.$swiper.slideNext();
    this.checkActive();
  }

  prev(): void {
    this.$refs.swiper.$swiper.slidePrev();
    this.checkActive();
  }

  checkActive(): void {
    // if (this.$refs.swiper.$swiper.activeIndex != 0) {
    //     this.$refs.swiper.$swiper.params.el.children[1].style.display = 'flex';
    // } else this.$refs.swiper.$swiper.params.el.children[1].style.display = 'none';
  }
}
</script>
<style lang="scss" scoped>
.swiper {
  width: 90%;
  position: static;
  max-height: 223px;
}

.swiper-wrapper {
}

.slider-container {
  position: relative;
  margin-bottom: 24px;
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

  .slide {
    border-radius: 12px;
    padding-bottom: 16px;
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    .img {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;

    }
    .format_icon {
      position: absolute;
      background-color: white;
      border-radius: $main-border-radius;
      height: 36px;
      width: 36px;
      display: flex;
      justify-content: center;
      bottom: 50px;
      left: 5px;
      align-items: center;
      .svg-icon {
        width: 15px !important;
        height: 15px !important;
        color: $blue !important;
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
    .slider-description{
      margin-left: 10px;
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
</style>