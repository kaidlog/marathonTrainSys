/**
 * 所有模組共享的getters
 */
export default {
  /**
   * 是否顯示資料處理中Spinner
   */
  isShowSpinner: state => {
    return state.axios.requestCount > 0;
  },
  /**
   * 是否顯示登出處理中Spinner
   */
  isShowLogoutSpinner: state => {
    return state.misc.showLogoutSpinner;
  }
};
