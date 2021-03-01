const axios = require("axios");

export default {
  /**
   * 新增跑步資料
   * @param payload 參數
   */
  doQueryGoalEndOrNotList: async function(payload) {
    let result = await axios.post("/querygoalendornot/01", payload);
    return result.data;
  }
};
