import Vue from 'vue';
import ElementUI from 'element-ui';
import VueAnalytics from 'vue-analytics';

import App from './App.vue';
import router from './router';
import store from './store/';
import sanitize from './plugins/sanitize';

// import './registerServiceWorker';
import './styles.scss';

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
