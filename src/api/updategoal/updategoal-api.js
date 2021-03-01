const axios = require("axios");

export default {
  /**
   * 更新目標
   * @param payload 查詢參數
   */
  doUpdateGoalList: async function(payload) {
    let result = await axios.post("/updategoal/01", payload);
    return result.data;
  },
};
