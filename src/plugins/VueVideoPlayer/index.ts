import VideoPlayer from 'vue-video-player';
import Vue from 'vue';
import hls from 'videojs-contrib-hls';

require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');

Vue.use(VideoPlayer);
Vue.use(hls);