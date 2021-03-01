import Vue from "vue";
// import { Base64 } from "js-base64";
// import { encrypt, decrypt } from '@/libs/crypt.js';
import App from "./App.vue";
import router from "@router";
import store from "@store";
import i18n from "@conf/i18n-config";
// import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import "@conf/crypt";
import "@conf/vuejs-logger-config";
import "@conf/vue-config";
import "@conf/jquery-config";
import "@conf/axios-config";
import "@conf/axios-mock-adapter-config";
import "@conf/block-ui-config";
import "@conf/sweetalert2-config";
import "@conf/v-charts-config";
import "@conf/vue-moment-config";
import "@conf/vue-lodash-config";
import "@conf/view-design-config";
import "@conf/fontawesome-config";
import "@conf/vue-fuse-config";
import "vue2-animate/dist/vue2-animate.min.css";

import "@assets/commonStyle.css";
import "@assets/style.css";

import "@assets/commonStyle.css";
import "@assets/style.css";

// ------------------------------------------------------------------------------------------------

// Vue.use(VueKeyCloak, {
//   init: {
//     onLoad: "login-required",
//     checkLoginIframe: false
//   },
//   config: {
//     url: process.env.VUE_APP_KEYCLOAK_AUTH_URL,
//     clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
//     realm: process.env.VUE_APP_KEYCLOAK_REALM
//   },
//   onReady: () => {
//     new Vue({
//       i18n,
//       router,
//       store,
//       render: h => h(App)
//     }).$mount("#app");
//   }
// });


new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");


