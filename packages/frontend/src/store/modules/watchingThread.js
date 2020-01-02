import board from '../../api/board';

const state = {
  list: [],
};

const getters = {
  getList: state => state.list,
};

const actions = {
  add({ commit, dispatch }, value) {
    const payload = {
      id: value.id,
      title: value.title,
      url: value.url,
      boardType: value.boardType,
    };
    commit('ADD_WATCHING_THREAD_ID', payload);
    dispatch('update', payload);
  },
  async load({ commit, dispatch }, value) {
    const threadList = await board.fetchCatalogList(value);
    const thread = threadList.find(
      thread => Number(thread.id) === Number(value.id),
    );
    if (!thread) return;

    const payload = {
      ...{
        id: value.id,
        boardType: value.boardType,
      },
      ...{
        title: thread.title,
        url: thread.url,
      },
    };
    dispatch('update', payload);
    commit('ADD_WATCHING_THREAD_ID', payload);
  },
  remove({ commit, dispatch }, value) {
    const payload = {
      id: value.id,
    };
    commit('REMOVE_WATCHING_THREAD_ID', payload);
    dispatch('saveLocalStorage', null, { root: true });
  },
  async removeDown({ commit, dispatch, state }) {
    const checks = state.list.map(async thread => {
      if (thread.isDown) {
        const payload = {
          id: thread.id,
        };
        return commit('REMOVE_WATCHING_THREAD_ID', payload);
      }
      await board
        .fetchResponseList({
          boardType: 'MAY',
          threadId: thread.id,
        })
        .catch(() => {
          const payload = {
            id: thread.id,
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
  async postComment({ dispatch }, value) {
    const payload = { boardType: 'MAY', threadId: value.id };
    await board.postComment({
      boardType: 'MAY',
      thread: { threadID: value.id, threadURL: value.url },
      payload: { comment: value.comment },
    });
    dispatch('loadResponse', payload);
  },
  async update({ commit, dispatch }, value) {
    const payload = {
      id: value.id,
      title: value.title,
      url: value.url,
    };
    try {
      const responses = await board.fetchResponseList({
        boardType: 'MAY',
        threadId: value.id,
      });
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
        const responses = await board.fetchResponseList({
          boardType: 'MAY',
          threadId: thread.id,
        });
        payload.push({
          id: thread.id,
          title: thread.title,
          url: thread.url,
          responses,
        });
      } catch (e) {
        payload.push({
          id: thread.id,
          title: thread.title,
          url: thread.url,
          responses: thread.responses,
          isDown: true,
        });
      }
    }
    commit('UPDATE_ALL_WATCHING_THREAD', payload);
    dispatch('saveLocalStorage', null, { root: true });
  },
  async loadCatalog({ commit }, value) {
    const payload = {};
    const data = await board.fetchCatalogList(value);
    payload.list = data;
    commit('LOAD_LIST', payload);
  },
  async loadResponse({ commit }, value) {
    const payload = {};
    const data = await board.fetchResponseList(value);
    payload.list = data;
    commit('LOAD_RESPONSE', payload);
  },
};
const mutations = {
  ADD_WATCHING_THREAD_ID(state, payload) {
    const isThreadDuplicated = state.list.some(
      thread => Number(thread.id) === Number(payload.id),
    );
    if (isThreadDuplicated) return;
    state.list = [...state.list, payload];
  },
  REMOVE_WATCHING_THREAD_ID(state, payload) {
    state.list = state.list.filter(
      thread => Number(thread.id) !== Number(payload.id),
    );
  },
  CLEAR_WATCHING_THREAD_ID(state) {
    state.list = [];
  },
  FREEZE_WATCHING_THREAD(state, payload) {
    const i = state.list.findIndex(
      thread => Number(thread.id) === Number(payload.id),
    );
    if (i === -1) return;
    const freezedThread = { ...state.list[i], ...{ isDown: true } };
    state.list.splice(i, 1, freezedThread);
  },
  UPDATE_WATCHING_THREAD(state, payload) {
    const i = state.list.findIndex(
      thread => Number(thread.id) === Number(payload.id),
    );
    if (i === -1) return;
    state.list.splice(i, 1, payload);
  },
  UPDATE_ALL_WATCHING_THREAD(state, payload) {
    state.list = [...payload];
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
