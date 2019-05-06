import board from '../../api/board';

const state = {
  modalOpen: false,
  list: []
};

const getters = {
  getModal: state => state.modalOpen,
  getList: state => state.list
};

const actions = {
  // closeModal({ commit }) {
  //   commit('CLOSE_MODAL');
  // },
  updateModal({ commit, dispatch, state }, value) {
    commit('UPDATE_MODAL');
    if (state.modalOpen) {
      dispatch('load', value);
    }
  },
  async load({ commit }, value) {
    const payload = {};
    const { data } = await board.fetchCatalogList(value);
    payload.list = data;
    commit('LOAD_LIST', payload);
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
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
