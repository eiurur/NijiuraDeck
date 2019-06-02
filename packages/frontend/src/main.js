import Vue from 'vue';
import ElementUI from 'element-ui';

import App from './App.vue';
import router from './router';
import store from './store/';
import './registerServiceWorker';
import './styles.scss';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch('loadLocalStorage');
  }
}).$mount('#app');
