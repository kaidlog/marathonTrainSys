import { throttle } from "lodash";
import messageBridgeApi from "@api/core/message-bridge-api";

// 倒數器重置通知者
const countdownNtifier = throttle(function() {
  messageBridgeApi.postMessage(
    "countdown-reset",
    process.env.VUE_APP_MSG_BRIDGE_POST_MSG_TARGET_ORIGIN
  );
}, 1000);

// 單點登出通知者
const singleLogoutNtifier = throttle(function() {
  messageBridgeApi.postMessage(
    "single-logout",
    process.env.VUE_APP_MSG_BRIDGE_POST_MSG_TARGET_ORIGIN
  );
}, 1000);

export default {
  /**
   * 以postMessage的方式，廣播訊息給各介接子系統
   * @param {*} message 通知訊息
   * @param {*} targetOrigin 指定哪些窗口能接收到消息事件
   */
  postMessage: function(message, targetOrigin) {
    window.frames["message_bridge_iframe"].postMessage(message, targetOrigin);
  },
  /**
   * 通知倒數計時器重置
   */
  notifyCountdownReset: function() {
    countdownNtifier();
  },
  /**
   * 通知進行單點登出
   */
  notifySingleLogout: function() {
    singleLogoutNtifier();
  }
};
