<template>
  <div>
    <iframe
      name="message_bridge_iframe"
      :src="notifyUrl"
      width="0"
      height="0"
      hidden="true"
    ></iframe>

    <Modal
      title="閒置時間逾時提醒!!"
      :value="showReminder"
      :closable="false"
      :mask-closable="false"
      @on-ok="doKeepSessionAlive"
      @on-cancel="logout"
      ok-text="繼續使用"
      cancel-text="登出系統"
    >
      <p>
        您的閒置時間過長，系統即將於{{ remainingMinutes }}:
        {{ remainingSeconds }}後自動登出，請問是否繼續使用?
      </p>
    </Modal>

    <BlockUI :message="logoutMsg" v-show="isShowSpinner">
      <font-awesome-icon icon="cog" size="3x" spin fixed-width>
      </font-awesome-icon>
    </BlockUI>

    <font-awesome-icon
      v-show="remainingMinutes >= 8"
      icon="hourglass-start"
      class="countDownIconStyle"
      fixed-width
      @click="doKeepSessionAlive"
    ></font-awesome-icon>

    <font-awesome-icon
      v-show="remainingMinutes >= 1 && remainingMinutes < 8"
      icon="hourglass-half"
      fixed-width
      @click="doKeepSessionAlive"
    ></font-awesome-icon>

    <font-awesome-icon
      v-show="remainingMinutes < 1"
      icon="hourglass-end"
      fixed-width
      @click="doKeepSessionAlive"
    ></font-awesome-icon>

    {{ remainingMinutes }}:{{ remainingSeconds }}
  </div>
</template>

<script>
import { mapActions } from "vuex";
import sessionKeeperApi from "@api/core/session-keeper-api";
import messageBridgeApi from "@api/core/message-bridge-api";

export default {
  components: {},
  props: {},
  data() {
    return {
      // 目前時間
      now: this.$moment(),
      // message bridge url
      notifyUrl: process.env.VUE_APP_EPSP_HOME_URL + "/message_bridge.html",
      // 系統登出中訊息
      logoutMsg: "系統登出中，請稍候!!",
      // 是否顯示登出中視窗
      isShowSpinner: false
    };
  },
  computed: {
    /** Session timeout時間 */
    sessionExpiredTime: function() {
      return this.$store.state.axios.sessionExpiredTime;
    },
    /** 彈出提醒視窗時間 */
    warningDateTime: function() {
      return this.$moment(this.sessionExpiredTime).subtract(1, "minutes");
    },
    /** 剩餘時間(分) */
    remainingMinutes: function() {
      let distance =
        this.$moment(this.sessionExpiredTime).toDate() - this.now.toDate();

      return this.formatRemaining(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      );
    },
    /** 剩餘時間(秒) */
    remainingSeconds: function() {
      let distance =
        this.$moment(this.sessionExpiredTime).toDate() - this.now.toDate();

      return this.formatRemaining(Math.floor((distance % (1000 * 60)) / 1000));
    },
    /** 是否彈出提醒視窗 */
    showReminder: function() {
      return this.now.isAfter(this.warningDateTime);
    }
  },
  methods: {
    ...mapActions(["doResetSessionExpiredTime"]),
    doKeepSessionAlive: function() {
      sessionKeeperApi.doKeepSessionAlive();
    },
    /** 登出 */
    logout: function() {
      messageBridgeApi.notifySingleLogout();
      this.doLogOut();
    },
    /** 格式化時間(若小於0，則回傳00，若為個位數，則前面補0) */
    formatRemaining: function(time) {
      if (time < 1) {
        return "00";
      }
      return this._.padStart(time, 2, "0");
    }
  },
  watch: {
    now: function() {
      if (this.now.isAfter(this.sessionExpiredTime)) {
        this.logout();
      }
    }
  },
  beforeCreate() {},
  created() {
    sessionKeeperApi.doKeepSessionAlive();

    /** 廣播訊息監聽器 */
    window.addEventListener("message", e => {
      // 倒數計時重置 ----------------------------------------------------------------------------------------------------
      if (
        "countdown-reset" === e.data.toString() &&
        process.env.VUE_APP_EPSP_HOME_URL === e.origin
      ) {
        this.doResetSessionExpiredTime();
      }

      // 單點登出(SLO) ---------------------------------------------------------------------------------------------------
      if (
        "single-logout" === e.data.toString() &&
        process.env.VUE_APP_EPSP_HOME_URL === e.origin
      ) {
        this.$Modal.warning({
          title: "登出通知",
          content: "<p>您已於其他系統登出，請重新操作!!</p>",
          onOk: () => {
            location.reload();
          }
        });
      }
    });

    /** 每秒鐘更新一次目前時間 */
    window.setInterval(() => {
      this.now = this.$moment();
    }, 1 * 1000);
  },
  beforeMount() {},
  mounted() {},
  activated() {},
  deactivated() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.countDownIconStyle {
  cursor: pointer;
}
</style>
