import Vue from 'vue';
import Vuex from 'vuex';

import catalog from './modules/catalog';
import setting from './modules/setting';
import modal from './modules/modal';
import watchingThread from './modules/watchingThread';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    catalog,
    setting,
    modal,
    watchingThread,
  },
  strict: debug,
  actions: {
    saveLocalStorage({ commit }) {
      commit('SAVE');
    },
    loadLocalStorage({ commit }) {
      commit('LOAD');
    },
  },
  mutations: {
    SAVE(state) {
      setTimeout(() => {
        localStorage.setItem('store', JSON.stringify(state));
      }, 0);
    },
    LOAD(state) {
      if (localStorage.getItem('store')) {
        const store = JSON.parse(localStorage.getItem('store'));
        const patch = {
          catalog: { ...store.catalog, ...{ isOpenedModal: false } },
          setting: { ...store.setting, ...{ isOpenedModal: false } },
        };
        this.replaceState({ ...state, ...store, ...patch });
      }
    },
  },
});
