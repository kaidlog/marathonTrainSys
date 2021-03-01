const axios = require("axios");

export default {
  /**
   * 更新跑步紀錄
   * @param payload 查詢參數
   */
  doQueryHistoryUserList: async function(payload) {
    let result = await axios.post("/queryhistoryuser/01", payload);
    return result.data;
  },
};
