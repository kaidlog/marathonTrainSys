<template>
  <div class="nav">
    <Row>
      <Col span="8">
        <div class="navPageLogo">
          <a :href="homeUrl" target="_blank">
            <img
              src="@assets/images/logo_white_esun.svg"
              title="MarathonTrain"
            />
          </a>
          <Col span="8">
          </Col>
        </div>
      </Col>
      <Col span="16">
        <div class="navBar">
          <!-- countdown -->
          <div class="navFunction">
            <countdown></countdown>
          </div>
          <!-- logout -->
          <div class="navFunction functionContainer">
            <button
              class="btnUiStyle btnNavImage"
              @click="logout"
              :style="logoutImage"
            ></button>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import Countdown from "@components/misc/Countdown";
import messageBridgeApi from "@api/core/message-bridge-api";

export default {
  components: {
    Countdown,
  },
  props: {},
  data() {
    return {
      // 使用者圖示
      userImage: {
        backgroundImage: "url(" + require("@assets/images/ic_white_user.svg"),
      },
      // 登出圖示
      logoutImage: {
        backgroundImage:
          "url(" + require("@assets/images/ic_white_log_out.svg"),
      },
      // EPSP個人首頁
      homeUrl: process.env.VUE_APP_MSG_BRIDGE_BASE_URL,
    };
  },
  computed: {},
  methods: {
    /** 登出 */
    logout: function() {
      messageBridgeApi.notifySingleLogout();
      this.doLogOut();
    },
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  activated() {},
  deactivated() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
.nav {
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.06em;
}
.navPageLogo {
  margin-top: calc((60px - 36px) / 2);
  font-size: 20px;
  font-weight: bold;
  float: left;
}
.navPageTitle {
  margin-top: calc((60px - 54px) / 2);
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  float: left;
}
.navBar {
  float: right;
}
.navFunction {
  margin-right: 15px;
  float: left;
}
.userContainer {
  padding-left: 29px;
  background-size: 24px;
  background-position: left center;
  background-repeat: no-repeat;
}
.btnUiStyle {
  height: 36px;
  line-height: 36px;
  border-radius: 18px;
  font-size: 16px;
  padding: 0 15px;
  border: 0;
  outline: none;
  cursor: pointer;
}
.btnNavImage {
  width: 36px;
  background-color: transparent;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
}
.btnNavImage:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.functionContainer {
  margin-top: calc((60px - 36px) / 2);
}
</style>
