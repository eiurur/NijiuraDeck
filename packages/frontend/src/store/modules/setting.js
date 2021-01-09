const state = {
  isOpenedModal: false,
};

const getters = {
  getModal: (state) => state.isOpenedModal,
};

const actions = {
  toggleModal({ commit }) {
    commit('TOGGLE_MODAL');
  },
};
const mutations = {
  TOGGLE_MODAL(state) {
    state.isOpenedModal = !state.isOpenedModal;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
