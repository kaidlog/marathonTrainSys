const axios = require("axios");

export default {
  /**
   * 信用卡清單查詢
   * @param payload 查詢參數
   */
  doQryCardList: async function(payload) {
    let result = await axios.post("/f010101/01", payload);
    return result.data;
  }
};
