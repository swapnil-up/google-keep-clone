//@ts-ignore
import { createStore } from "vuex";

const store = createStore({
  state: {
    notesCount: 0,
    isLoggedIn: false,
  },
  mutations: {
    incrementNotesCount(state: { notesCount: number }, payload: number) {
      state.notesCount += payload;
    },
    login(state: { isLoggedIn: boolean }) {
      state.isLoggedIn = true;
    },
    logout(state: { isLoggedIn: boolean }) {
      state.isLoggedIn = false;
    },
  },
  //   actions: {
  //     incrementAsync({ commit }) {
  //       setTimeout(() => commit("INCREMENT_COUNT", 1), 5000);
  //     },
  //   },
  //   getters: {
  //     doubleCount(state: { count: number }) {
  //       return state.count * 2;
  //     },
  //   },
});

export default store;
