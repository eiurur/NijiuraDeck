const state = {
  modalOpen: false
};

const getters = {
  getModal: state => state.modalOpen
};

const actions = {
  updateModal({ commit }) {
    commit('UPDATE_MODAL');
  }
};
const mutations = {
  UPDATE_MODAL(state) {
    state.modalOpen = !state.modalOpen;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
