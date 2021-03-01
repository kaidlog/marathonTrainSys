const axios = require("axios");

export default {
  /**
   * 跑步紀錄查詢
   * @param payload 查詢參數
   */
  doQueryRunningActivityList: async function(payload) {
    let result = await axios.post("/queryrunningactivity/01", payload);
    return result.data;
  },
};
