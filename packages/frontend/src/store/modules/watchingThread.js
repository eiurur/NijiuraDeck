import board from '../../api/board';

const state = {
  list: []
};

const getters = {
  getList: state => state.list
};

const actions = {
  add({ commit, dispatch }, value) {
    const payload = {
      id: value.id,
      title: value.title,
      url: value.url,
      boardType: value.boardType
    };
    commit('ADD_WATCHING_THREAD_ID', payload);
    dispatch('update', payload);
  },
  remove({ commit, dispatch }, value) {
    const payload = {
      id: value.id
    };
    commit('REMOVE_WATCHING_THREAD_ID', payload);
    dispatch('saveLocalStorage', null, { root: true });
  },
  async removeDown({ commit, dispatch, state }) {
    const checks = state.list.map(async (thread) => {
      if (thread.isDown) {
        const payload = {
          id: thread.id
        };
        return commit('REMOVE_WATCHING_THREAD_ID', payload);
      }
      await board
        .fetchReponseList({
          boardType: 'MAY',
          threadId: thread.id
        })
        .catch((e) => {
          const payload = {
            id: thread.id
          };
          commit('REMOVE_WATCHING_THREAD_ID', payload);
        });
    });
    await Promise.all(checks);
    dispatch('saveLocalStorage', null, { root: true });
  },
  clear({ commit }) {
    commit('CLEAR_WATCHING_THREAD_ID');
  },
  async update({ commit, dispatch }, value) {
    const payload = {
      id: value.id,
      title: value.title,
      url: value.url
    };
    try {
      const responses = await board.fetchReponseList({ boardType: 'MAY', threadId: value.id });
      payload.responses = responses;
      commit('UPDATE_WATCHING_THREAD', payload);
    } catch (e) {
      commit('FREEZE_WATCHING_THREAD', payload);
    }
    dispatch('saveLocalStorage', null, { root: true });
  },
  async updateAll({ commit, dispatch, state }) {
    const payload = [];
    for (const thread of state.list) {
      try {
        const responses = await board.fetchReponseList({ boardType: 'MAY', threadId: thread.id });
        payload.push({
          id: thread.id,
          title: thread.title,
          url: thread.url,
          responses
        });
      } catch (e) {
        payload.push({
          id: thread.id,
          title: thread.title,
          url: thread.url,
          responses: thread.responses,
          isDown: true
        });
      }
    }
    commit('UPDATE_ALL_WATCHING_THREAD', payload);
    dispatch('saveLocalStorage', null, { root: true });
  },
  async load({ commit }, value) {
    const payload = {};
    const data = await board.fetchCatalogList(value);
    payload.list = data;
    commit('LOAD_LIST', payload);
  },
  async loadResponse({ commit }, value) {
    const payload = {};
    const data = await board.fetchReponseList(value);
    payload.list = data;
    commit('LOAD_RESPONSE', payload);
  }
};
const mutations = {
  ADD_WATCHING_THREAD_ID(state, payload) {
    const isThreadDuplicated = state.list.some(thread => thread.id === payload.id);
    if (isThreadDuplicated) return;
    state.list = [...state.list, payload];
  },
  REMOVE_WATCHING_THREAD_ID(state, payload) {
    state.list = state.list.filter(thread => thread.id !== payload.id);
  },
  CLEAR_WATCHING_THREAD_ID(state) {
    state.list = [];
  },
  FREEZE_WATCHING_THREAD(state, payload) {
    const i = state.list.findIndex(thread => thread.id === payload.id);
    if (i === -1) return;
    const freezedThread = Object.assign({}, state.list[i], { isDown: true });
    state.list.splice(i, 1, freezedThread);
  },
  UPDATE_WATCHING_THREAD(state, payload) {
    const i = state.list.findIndex(thread => thread.id === payload.id);
    if (i === -1) return;
    state.list.splice(i, 1, payload);
  },
  UPDATE_ALL_WATCHING_THREAD(state, payload) {
    state.list = [...payload];
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
