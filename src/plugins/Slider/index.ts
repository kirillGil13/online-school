import Vue from 'vue'
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay } from 'swiper/core'
import 'swiper/swiper-bundle.css';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'


SwiperClass.use([Pagination, Mousewheel, Autoplay])

Vue.use(getAwesomeSwiper(SwiperClass))


