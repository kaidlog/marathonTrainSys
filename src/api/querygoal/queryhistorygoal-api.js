const axios = require("axios");

export default {
  /**
   * 新增跑步資料
   * @param payload 參數
   */
  doQueryHistoryGoalList: async function(payload) {
    let result = await axios.post("/queryhistorygoal/01", payload);
    return result.data;
  }
};
