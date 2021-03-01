const axios = require("axios");

export default {
  /**
   * 新增跑步資料
   * @param payload 參數
   */
  doQueryHistoryRunningActivityList: async function(payload) {
    let result = await axios.post("/queryhistoryrunningactivity/01", payload);
    return result.data;
  }
};
