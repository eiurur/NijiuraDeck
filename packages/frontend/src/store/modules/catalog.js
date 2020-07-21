import board from '../../api/board';

const state = {
  modalOpen: false,
  favoriteSearchWords: [],
  ngSearchWords: [],
  currentThread: {},
  threads: {
    loading: false,
    list: [],
  },
  responses: {
    loading: false,
    list: [],
  },
};

const getters = {
  getModal: (state) => state.modalOpen,
  getFavoriteSearchWords: (state) => state.favoriteSearchWords,
  getNgSearchWords: (state) => state.ngSearchWords,
  getCurrentThread: (state) => state.currentThread,
  getThreads: (state) => state.threads,
  getResponses: (state) => state.responses,
};

const actions = {
  updateModal({ commit, dispatch, state }, value) {
    commit('UPDATE_MODAL');
    if (state.modalOpen) {
      dispatch('load', value);
    }
  },
  removeFavoriteSearchWords({ commit }, value) {
    const payload = { word: value };
    commit('REMOVE_FAVORITE_SEARCH_WORDS', payload);
  },
  addFavoriteSearchWords({ commit }, value) {
    const payload = { word: value };
    commit('UPDATE_FAVORITE_SEARCH_WORDS', payload);
  },
  removeNgSearchWords({ commit }, value) {
    const payload = { word: value };
    commit('REMOVE_NG_SEARCH_WORDS', payload);
  },
  addNgSearchWords({ commit }, value) {
    const payload = { word: value };
    commit('UPDATE_NG_SEARCH_WORDS', payload);
  },
  setCurrentThread({ commit }, value) {
    const payload = { thread: value.thread };
    commit('UPDATE_CURRENT_THREAD', payload);
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
    const list = await board.fetchResponseList(value);
    payload.list = list;
    commit('LOAD_RESPONSE', payload);
    commit('UPDATE_FETCHING_STATUS', { type: 'responses', loading: false });
  },
};
const mutations = {
  UPDATE_MODAL(state) {
    state.modalOpen = !state.modalOpen;
  },
  REMOVE_FAVORITE_SEARCH_WORDS(state, payload) {
    state.favoriteSearchWords.splice(
      state.favoriteSearchWords.indexOf(payload.word),
      1,
    );
  },
  UPDATE_FAVORITE_SEARCH_WORDS(state, payload) {
    if (!state.favoriteSearchWords) {
      state.favoriteSearchWords = [payload.word];
    } else {
      state.favoriteSearchWords = Array.from(
        new Set([...state.favoriteSearchWords, payload.word]),
      );
    }
  },
  REMOVE_NG_SEARCH_WORDS(state, payload) {
    state.ngSearchWords.splice(state.ngSearchWords.indexOf(payload.word), 1);
  },
  UPDATE_NG_SEARCH_WORDS(state, payload) {
    if (!state.ngSearchWords) {
      state.ngSearchWords = [payload.word];
    } else {
      state.ngSearchWords = Array.from(
        new Set([...state.ngSearchWords, payload.word]),
      );
    }
    console.log(state.ngSearchWords);
  },
  UPDATE_CURRENT_THREAD(state, payload) {
    state.currentThread = payload.thread;
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
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
