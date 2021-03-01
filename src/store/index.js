import Vue from "vue";
import Vuex from "vuex";
import mutations from "@store/mutations";
import actions from "@store/actions";
import getters from "@store/getters";
// import createLogger from "vuex/dist/logger";
import createPersistedState from "vuex-persistedstate";
import moment from "moment";
import auth from "@store/modules/auth";
import showgoal from "@store/modules/showgoal";
import runningactivity from "@store/modules/runningactivity";
import avgdata from "@store/modules/avgdata";
import test from "@store/modules/test";
import createMultiTabState from 'vuex-multi-tab-state';

Vue.use(Vuex);

// State初使設定 --------------------------------------------------------------------------------------
const state = {
  /**
   * 使用者基本資料
   */

  userProfile: {
    optUserProfile: {},
    loginUserProfile: {},
    token: "y",
    timeout: 10,
  },
  /**
   * Axios AJAX訊息
   */
  axios: {
    requestCount: 0,
    sessionExpiredTime: moment().add(
      process.env.VUE_APP_SESSION_TIMEOUT,
      "minutes"
    ),
  },
  /**
   * 其它資訊
   */
  misc: {
    showLogoutSpinner: false,
  },
};

// 插件設定 -------------------------------------------------------------------------------------------
const plugins = [
  createPersistedState({
    storage: window.sessionStorage,
  }),
  createMultiTabState(),
];

// const sessionPersisted = createPersistedState({
//   storage: window.sessionStorage,
// });

// plugins.push(sessionPersisted);

// if (process.env.NODE_ENV !== "prod") {
//   plugins.push(createLogger());
// }

// 匯出Vuex -----------------------------------------------------------------------------------------
export default new Vuex.Store({
  modules: {
    auth,
    showgoal,
    runningactivity,
    avgdata,
    test,
  },
  state,
  getters,
  actions,
  mutations,
  plugins,
  /**
   * 嚴格模式: 無論何時發生了狀態變更且不是由 mutation 函數引起的，將會拋出錯誤。
   * 嚴格模式會深度監測狀態樹來檢測不合規的狀態變更——請確保在發佈環境下關閉嚴格模式，以避免性能損失。
   */
  strict: process.env.NODE_ENV !== "prod",
});
