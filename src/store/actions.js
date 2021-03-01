/**
 * 所有模組共享的actions
 */
import Types from "@store/mutation-types";

export default {
  /**
   * 儲存使用者基本資料
   * @param {*} param0
   * @param {*} payload 使用者基本資料
   */
  doStoredUserProfile({ commit }, payload) {
    commit(Types.UPDATE_USER_PROFILE, payload);
  },
  /**
   * 更新操作使用者基本資料
   * @param {*} param0
   * @param {*} payload 操作者基本資料
   */
  doUpdateOptUserProfile({ commit }, payload) {
    commit(Types.UPDATE_OPT_USER_PROFILE, payload);
  },
  /**
   * 清除使用者基本資料
   * @param {*} param0
   */
  doCleanUserProfile({ commit }) {
    commit(Types.REMOVE_USER_PROFILE);
  },
  /**
   * 更新是否顯示登出SPINNER
   * @param {*} state
   * @param {*} payload 是否顯示登出SPINNER
   */
  doUpdateIsShowLogoutSpinner({ commit }, payload) {
    commit(Types.UPDATE_SHOW_LOGOUT_SPINNER, payload);
  },
  /**
   * 重設Session逾期操作時間
   * @param {*} param0
   */
  doResetSessionExpiredTime({ commit }) {
    commit(Types.RESET_SESSION_EXPIRED_TIME);
  },
  /**
   * AJAX Request執行中次數加1
   * @param {*} param0
   */
  doIncrementAjaxReq({ commit }) {
    commit(Types.INCREMENT_AJAX_REQ);
  },
  /**
   * AJAX Request執行中次數減1
   * @param {*} param0
   */
  doDecrementAjaxReq({ commit }) {
    commit(Types.DECREMENT_AJAX_REQ);
  },
};
