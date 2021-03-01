const axios = require("axios");
import store from "@store";

export default {
  /**
   * 取得登入者基本資料
   */
  doFetchLoginUserProfile: async function() {
    let result = await axios.post("/user_profile/01");

    // 200: success
    if ("200" !== result.data.status) {
      return null;
    }

    return result.data.body;
  },
  /**
   * 取得操作者基本資料
   */
  doFetchOptUserProfile: async function() {
    let result = await axios.post("/user_profile/02");

    // 200: success
    if ("200" !== result.data.status) {
      return null;
    }

    return result.data.body;
  },
  /**
   * 代理人身份切換
   */
  doSwitchIdentify: async function(payload) {
    let result = await axios.post("/user_profile/03", payload);

    // 200: success
    if ("200" === result.data.status && result.data.body) {
      store.dispatch("doUpdateOptUserProfile", result.data.body);
    }

    return result.data.body;
  }
};
