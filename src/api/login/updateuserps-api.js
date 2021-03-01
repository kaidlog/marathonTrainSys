const axios = require("axios");

export default {
  /**
   * 更新跑步紀錄
   * @param payload 查詢參數
   */
  doUpdateUserPsList: async function(payload) {
    let result = await axios.post("/updateps/01", payload);
    return result.data;
  },
};
