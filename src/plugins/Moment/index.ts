import Vue from 'vue';
import * as moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import VueMoment from 'vue-moment';

momentDurationFormatSetup(moment);
require('./ru');
Vue.use(VueMoment, {moment: moment});

export default {};
