const axios = require("axios");
import { map } from "lodash";

export default {
  /**
   * 代碼清單查詢
   * @param payload {
   *    ctId: 類別代碼
   *    cdId: 明細代碼
   *    suspend: 是否停用
   *    flag01: 其它用途註記 01
   *    flag02: 其它用途註記 02
   *    flag03: 其
   * 
   * 
   * 
   * 
   * 它用途註記 03
   *    flag04: 其它用途註記 04
   *    flag05: 其它用途註記 05
   *    flag06: 其它用途註記 06
   *    flag07: 其它用途註記 07
   *    flag08: 其它用途註記 08
   *    flag09: 其它用途註記 09
   *    flag10: 其它用途註記 10
   * }
   */
  doQryCodeList: async function(payload) {
    let result = await axios.post("/code/01", payload);

    // 200: success
    if ("200" !== result.data.status) {
      return [];
    }
    return result;
  },
  /**
   * 代碼{label,value}清單查詢
   * @param payload {
   *    ctId: 類別代碼
   *    cdId: 明細代碼
   *    suspend: 是否停用
   *    flag01: 其它用途註記 01
   *    flag02: 其它用途註記 02
   *    flag03: 其它用途註記 03
   *    flag04: 其它用途註記 04
   *    flag05: 其它用途註記 05
   *    flag06: 其它用途註記 06
   *    flag07: 其它用途註記 07
   *    flag08: 其它用途註記 08
   *    flag09: 其它用途註記 09
   *    flag10: 其它用途註記 10
   * }
   */
  doQryCodeLabelValueList: async function(payload) {
    let result = await axios.post("/code/01", payload);

    // 200: success
    if ("200" !== result.data.status) {
      return [];
    }

    return map(result.data.body, function(row) {
      return {
        value: row.cdId,
        label: row.cdNm
      };
    });
  }
};
