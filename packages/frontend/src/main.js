import Vue from 'vue';
import ElementUI from 'element-ui';
import VueAnalytics from 'vue-analytics';

import App from './App.vue';
import router from './router';
import store from './store/';
import sanitize from './plugins/sanitize';
import './registerServiceWorker';
import './styles.scss';

Vue.use(ElementUI);
Vue.use(VueAnalytics, {
  id: 'UA-42893827-26',
  router
});

Vue.prototype.$sanitize = sanitize;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch('loadLocalStorage');
  }
}).$mount('#app');
