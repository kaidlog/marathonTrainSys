const axios = require("axios");

export default {
  /**
   * 新增註冊
   * @param payload 查詢參數
   */
  doAddUserList: async function(payload) {
    let result = await axios.post("/register/01", payload);
    return result.data;
  }
};
