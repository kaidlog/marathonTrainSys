const axios = require("axios");

export default {
  /**
   * 刪除跑步資料
   * @param payload 參數
   */
  doDeleteRunningActivityList: async function(payload) {
    let result = await axios.post("/deleterunningactivity/01", payload);
    return result.data;
  },
};
