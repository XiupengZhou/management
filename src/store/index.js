import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { addRoutes,superRoutes } from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    userInfo: {
      username: "",
      // 账号
      account: "",
      // 角色类型
      type: "",
    },
    lang: "zh",
    token: "",
    routes: [],
  }, 

  mutations: {
    set_lang(state, payload) {
      state.lang = payload;
    },
    set_userInfo(state, payload) {
      state.userInfo = payload;
    },
    set_token(state, payload) {
      state.token = payload;
    },
    set_routes(state, payload) {
      state.routes = payload;
    },
  },
});
