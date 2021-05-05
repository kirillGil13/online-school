import VueGtm from '@gtm-support/vue2-gtm';
import {router} from '@/router/router';
import Vue from 'vue';
import {RouterNameEnum} from '@/router/router.types';

Vue.use(VueGtm, {
    id: 'GTM-K6GW9TQ',
    defer: false, // defaults to false. Script can be set to `defer` to increase page-load-time at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible)
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: true, // Whether or not display console logs debugs (optional)
    loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    ignoredViews: [RouterNameEnum.NotFound], // Don't trigger events for specified router names (case insensitive) (optional)
    trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
});
