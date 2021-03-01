/**
 * 所有模組共享的mutations
 */
import Types from "@store/mutation-types";
import moment from "moment";

export default {
  /**
   * 更新使用者基本資料
   * @param {*} state
   * @param {*} payload 使用者基本資料
   */
  [Types.UPDATE_USER_PROFILE](state, payload) {
    state.userProfile.optUserProfile = payload;
    state.userProfile.loginUserProfile = payload;
  },
  /**
   * 更新操作使用者基本資料
   * @param {*} state
   * @param {*} payload 操作者基本資料
   */
  [Types.UPDATE_OPT_USER_PROFILE](state, payload) {
    state.userProfile.optUserProfile = payload;
  },
  /**
   * 清除使用者基本資料
   * @param {*} state
   */
  [Types.REMOVE_USER_PROFILE](state) {
    state.userProfile.optUserProfile = {};
    state.userProfile.loginUserProfile = {};
  },
  /**
   * 更新是否顯示登出SPINNER
   * @param {*} state
   * @param {*} payload 是否顯示登出SPINNER
   */
  [Types.UPDATE_SHOW_LOGOUT_SPINNER](state, payload) {
    state.misc.showLogoutSpinner = payload.isShowLogoutSpinner;
  },
  /**
   * 重設Session逾期操作時間
   * @param {*} state
   */
  [Types.RESET_SESSION_EXPIRED_TIME](state) {
    state.axios.sessionExpiredTime = moment().add(
      process.env.VUE_APP_SESSION_TIMEOUT,
      "days"
    );
  },
  /**
   * AJAX Request執行中次數加1
   * @param {*} state
   */
  [Types.INCREMENT_AJAX_REQ](state) {
    state.axios.requestCount++;
  },
  /**
   * AJAX Request執行中次數減1
   * @param {*} state
   */
  [Types.DECREMENT_AJAX_REQ](state) {
    state.axios.requestCount--;
  }
};
