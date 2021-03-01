const axios = require("axios");

export default {
  /**
   * 登入帳號
   * @param payload 查詢參數
   */
  doQryUserEmailList: async function(payload) {
    let result = await axios.post("/emailcheck/01", payload);
    return result.data;
  }
};
