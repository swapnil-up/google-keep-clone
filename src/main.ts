import { createApp } from "vue";
import { createPinia } from "pinia";
//@ts-ignore
import { createStore } from "vuex";

const store = createStore({
  state: (): { notesCount: number } => ({
    notesCount: 0,
  }),
  mutations: {
    incrementNotesCount(state: { notesCount: number }, payload: number) {
      state.notesCount += payload;
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

import App from "./App.vue";
import "./index.css";
import router from "./router.ts";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(store);
app.mount("#app");
