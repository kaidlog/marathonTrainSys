const axios = require("axios");

export default {
  /**
   * 刪除目標資料
   * @param payload 參數
   */
  doDeleteGoalList: async function(payload) {
    let result = await axios.post("/deletegoal/01", payload);
    return result.data;
  },
};
