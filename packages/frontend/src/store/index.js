import Vue from 'vue';
import Vuex from 'vuex';
import catalog from './modules/catalog';
import setting from './modules/setting';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    catalog,
    setting
  },
  strict: debug
  // plugins: debug ? [createLogger()] : [],
  // plugins: debug ? [createLogger()] : [],
});
