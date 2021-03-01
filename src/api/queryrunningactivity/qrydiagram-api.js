const axios = require("axios");

export default {
  /**
   * 跑步圖表查詢
   * @param payload 查詢參數
   */
  doQryDiagramList: async function(payload) {
    let result = await axios.post("/qrydiagram/01", payload);
    return result.data;
  },
};
