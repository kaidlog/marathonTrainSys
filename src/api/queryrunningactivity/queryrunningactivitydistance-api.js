const axios = require("axios");

export default {
  /**
   * 跑步紀錄查詢
   * @param payload 查詢參數
   */
  doQueryRunningActivityDistanceList: async function(payload) {
    let result = await axios.post("/queryrunningactivitydistance/01", payload);
    return result.data;
  },
};
