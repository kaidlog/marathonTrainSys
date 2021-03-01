import $ from "jquery";
import { mapActions } from "vuex";
//import sessionKeeperApi from "@api/core/session-keeper-api";

export default {
  created() {
    $(document).ready(function() {
      $(
        "input[type=text], input[type=search], input[type=url], input[type=telephone], input[type=email], input[type=password]"
      ).attr("autocomplete", "off");

      $("button, input[type=button], input[type=submit]").click(function() {
        $(this).prop("disabled", true);
        setTimeout(() => {
          $(this).prop("disabled", false);
        }, 250);
      });
    });
  },
  methods: {
    ...mapActions(["doUpdateIsShowLogoutSpinner"]),
    /**
     * 登出系統
     */
    doLogOut: async function() {
      this.doUpdateIsShowLogoutSpinner({ isShowLogoutSpinner: true });

      // sessionKeeperApi.doLogOut().then(() => {
      //   let epspHome = process.env.VUE_APP_EPSP_HOME_URL;
      //   window.location.href =
      //     epspHome + "/logout_page.html?redirect_uri=" + epspHome;
      // });

      // sessionKeeperApi.doLogOut().then(() => {
      //   this.$keycloak.logoutFn();
      // });
    }
  },
  activated() {},
  updated() {}
};
