const axios = require("axios");
import store from "@store";
// import { map } from "lodash";

export default {
  /**
   * 保持Session不要timeout
   */
  doKeepSessionAlive: async function() {
    //let result = await axios.post("/session_keeper/01");
    let result = await axios.post("/session_keeper/01");
    return result;
  },
  /**
   * 登出
   */
  doLogOut: async function() {
    store.dispatch("doCleanUserProfile");
    let result = await axios.post("/session_keeper/02");
    return result;
  }
};
