import board from '../../api/board';

const state = {
  modalOpen: false,
  list: [],
  responses: []
};

const getters = {
  getModal: state => state.modalOpen,
  getList: state => state.list,
  getResponses: state => state.responses
};

const actions = {
  // closeModal({ commit }) {
  //   commit('CLOSE_MODAL');
  updateModal({ commit, dispatch, state }, value) {
    commit('UPDATE_MODAL');
    if (state.modalOpen) {
      dispatch('load', value);
    }
  },
  async load({ commit }, value) {
    const payload = {};
    const list = await board.fetchCatalogList(value);
    payload.list = list;
    commit('LOAD_LIST', payload);
  },
  async loadResponse({ commit, dispatch, state }, value) {
    const payload = {};
    const list = await board.fetchReponseList(value);
    payload.list = list;
    commit('LOAD_RESPONSE', payload);
  }
};
const mutations = {
  // CLOSE_MODAL(state) {
  //   state.modalOpen = false;
  // },
  UPDATE_MODAL(state) {
    state.modalOpen = !state.modalOpen;
  },
  LOAD_LIST(state, payload) {
    state.list = payload.list;
  },
  LOAD_RESPONSE(state, payload) {
    state.responses = payload.list;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
