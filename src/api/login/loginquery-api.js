import store from "@store"
const axios = require("axios");

export default {
  /**
   * 登入帳號
   * @param payload 查詢參數
   */
  doQryUserList: async function(payload) {
    let result = await axios.post("/login/01", payload);
    return result.data;
  },
  doGetCurrentAuthList: async function(payload) {
    let result = await axios.post("/login/getAuth", payload);
    return result.data;
  },
  doClearCurrentAuthList: async function(payload) {
    let result = await axios.post("/login/clearAuth", payload);
    store.commit("auth/updateAuth", {
      token: null,
      uuid: null,
      firstname: null,
      lastname: null,
      addr: null,
      gender: null,
      timeout: null,
      height: null,
      weight: null,
      email: null,
      handphone: null,
      birthday: null,
      suspendOrNot: null,
    });
    return result.data;
  }
};
