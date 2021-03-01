const axios = require("axios");

export default {
  /**
   * 查詢剩餘天數資料
   * @param payload 參數
   */
  doQueryLastDaysList: async function(payload) {
    let result = await axios.post("/querylastdays/01", payload);
    return result.data;
  }
};
