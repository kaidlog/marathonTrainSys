const axios = require("axios");

export default {
  /**
   * 跑步圖表查詢
   * @param payload 查詢參數
   */
  doQryAvgDataList: async function(payload) {
    let result = await axios.post("/qryavgdata/01", payload);
    return result.data;
  },
};
