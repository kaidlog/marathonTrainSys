const axios = require("axios");

export default {
  /**
   * 更新跑步紀錄
   * @param payload 查詢參數
   */
  doUpdateUserDataList: async function(payload) {
    let result = await axios.post("/updateuserdata/01", payload);
    return result.data;
  },
};
