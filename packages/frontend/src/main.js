import Vue from 'vue';
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';
import VueAnalytics from 'vue-analytics';
import GlobalEvents from 'vue-global-events';

import App from './App.vue';
import router from './router';
import store from './store/';
import sanitize from './plugins/sanitize';
import { errorImageBase64, loadingImageBase64 } from './constants';

// import './registerServiceWorker';

const isProd = process.env.NODE_ENV === 'production';

Vue.use(ElementUI);
Vue.use(VueAnalytics, {
  id: 'UA-42893827-26',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd,
  },
});
Vue.use(VueLazyload, {
  preLoad: 1.3,
  observer: true,
  loading: loadingImageBase64,
  error: errorImageBase64,
});
Vue.component('GlobalEvents', GlobalEvents);

Vue.prototype.$sanitize = sanitize;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    this.$store.dispatch('loadLocalStorage');
  },
}).$mount('#app');
