import board from '../../api/board';

const state = {
  modalOpen: false,
  threads: {
    loading: false,
    list: []
  },
  responses: {
    loading: false,
    list: []
  }
};

const getters = {
  getModal: state => state.modalOpen,
  getThreads: state => state.threads,
  getResponses: state => state.responses
};

const actions = {
  updateModal({ commit, dispatch, state }, value) {
    commit('UPDATE_MODAL');
    if (state.modalOpen) {
      dispatch('load', value);
    }
  },
  async load({ commit }, value) {
    commit('UPDATE_FETCHING_STATUS', { type: 'threads', loading: true });
    const payload = {};
    const list = await board.fetchCatalogList(value);
    payload.list = list;
    commit('LOAD_LIST', payload);
    commit('UPDATE_FETCHING_STATUS', { type: 'threads', loading: false });
  },
  async loadResponse({ commit }, value) {
    commit('UPDATE_FETCHING_STATUS', { type: 'responses', loading: true });
    const payload = {};
    const list = await board.fetchReponseList(value);
    payload.list = list;
    commit('LOAD_RESPONSE', payload);
    commit('UPDATE_FETCHING_STATUS', { type: 'responses', loading: false });
  }
};
const mutations = {
  UPDATE_MODAL(state) {
    state.modalOpen = !state.modalOpen;
  },
  UPDATE_FETCHING_STATUS(state, payload) {
    if (!state[payload.type]) return;
    state[payload.type].loading = payload.loading;
  },
  LOAD_LIST(state, payload) {
    state.threads.list = payload.list;
  },
  LOAD_RESPONSE(state, payload) {
    state.responses.list = payload.list;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
