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
  remove({ commit }, value) {
    const payload = {
      id: value.id
    };
    commit('REMOVE_WATCHING_THREAD_ID', payload);
  },
  async removeDead({ commit, state }) {
    for (const thread in state.list) {
      console.log('removeDead', thread);
      try {
        const responses = await board.fetchReponseList({ boardType: 'MAY', threadId: thread.id });
        payload.push({
          id: thread.id,
          title: thread.title,
          responses
        });
      } catch (e) {
        const payload = {
          id: thread.id
        };
        commit('REMOVE_WATCHING_THREAD_ID', payload);
      }
    }
  },
  clear({ commit }) {
    commit('CLEAR_WATCHING_THREAD_ID');
  },
  async update({ commit }, value) {
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
  },
  async updateAll({ commit, state }) {
    const payload = [];
    for (const thread in state.list) {
      try {
        const responses = await board.fetchReponseList({ boardType: 'MAY', threadId: thread.id });
        payload.push({
          id: thread.id,
          title: thread.title,
          url: value.url,
          responses
        });
      } catch (e) {
        payload.push({
          id: thread.id,
          title: thread.title,
          url: value.url,
          responses: thread.responses,
          isDown: true
        });
      }
    }
    commit('UPDATE_ALL_WATCHING_THREAD', payload);
  },
  async load({ commit }, value) {
    const payload = {};
    const data = await board.fetchCatalogList(value);
    payload.list = data;
    commit('LOAD_LIST', payload);
  },
  async loadResponse({ commit, dispatch, state }, value) {
    const payload = {};
    const data = await board.fetchReponseList(value);
    payload.list = data;
    commit('LOAD_RESPONSE', payload);
  }
};
const mutations = {
  ADD_WATCHING_THREAD_ID(state, payload) {
    state.list = [...state.list, payload];
  },
  REMOVE_WATCHING_THREAD_ID(state, payload) {
    state.list = state.list.filter(thread => thread.id !== payload.id);
  },
  CLEAR_WATCHING_THREAD_ID(state) {
    state.list = [];
  },
  UPDATE_WATCHING_THREAD(state, payload) {
    const i = state.list.findIndex(thread => thread.id === payload.id);
    if (i === -1) return;
    state.list.splice(i, 1, payload);
  },
  UPDATE_ALL_WATCHING_THREAD(state, payload) {
    state.list = [...payload];
  },
  FREEZE_WATCHING_THREAD(state, payload) {
    const i = state.list.findIndex(thread => thread.id === payload.id);
    if (i === -1) return;
    const freezedThread = Object.assign(state.list[i], { isDown: true });
    console.log(freezedThread);
    state.list.splice(i, 1, freezedThread);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
