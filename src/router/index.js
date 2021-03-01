import Vue from "vue";
import VueRouter from "vue-router";
// import getAuthApi from "@api/login/loginquery-api.js";
import store from "@store";
import ViewUI from "view-design";

Vue.use(VueRouter);

const routes = [
  // HomePage ------------------------------------------------------------------------------------------
  {
    /** TODO */
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "login" */ "@views/goal/showgoal.vue"),
  },
  {
    /** TODO */
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "HomePage" */ "@views/LandingPage.vue"),
  },
  // Login -----------------------------------------------------------------------------------------
  {
    /** TODO */
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@views/login/register.vue"),
  },
  {
    /** TODO */
    path: "/logout",
    name: "logout",
    redirect: "logout",
    component: () =>
      import(/* webpackChunkName: "register" */ "@views/login/logout.vue"),
  },
  {
    /** TODO */
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@views/login/loginquery.vue"),
  },
  // User ------------------------------------------------------------------------------------------
  {
    /** TODO */
    path: "/userguide",
    name: "userguide",
    component: () =>
      import(
        /* webpackChunkName: "HomePage" */ "@views/userguide/userguide.vue"
      ),
  },
  {
    /** User Profile */
    path: "/editprofile",
    name: "editprofile",
    component: () =>
      import(/* webpackChunkName: "Core" */ "@views/test/editprofile.vue"),
  },
  {
    /** Notification */
    path: "/notification",
    name: "notification",
    component: () =>
      import(/* webpackChunkName: "Core" */ "@views/test/notification.vue"),
  },
  {
    /** User Auth Manage */
    path: "/userauthmanage",
    name: "userauthmanage",
    component: () =>
      import(/* webpackChunkName: "Core" */ "@views/test/userauthmanage.vue"),
  },
  {
    /** Qry Avg Data */
    path: "/fetchavgdata",
    name: "fetchavgdata",
    component: () =>
      import(/* webpackChunkName: "Core" */ "@views/test/fetchavgdata.vue"),
  },
  // Running Activity District ---------------------------------------------------------------------------------
  {
    /** TODO */
    path: "/showrunningactivity",
    name: "showrunningactivity",
    component: () =>
      import(
        /* webpackChunkName: "HomePage" */ "@views/runningactivity/showrunningactivity.vue"
      ),
  },
  // Goal District ---------------------------------------------------------------------------------
  {
    /** TODO */
    path: "/overview",
    name: "overview",
    component: () =>
      import(
        /* webpackChunkName: "HomePage" */ "@views/single-page/home/home.vue"
      ),
  },
  {
    /** TODO */
    path: "/showgoal",
    name: "showgoal",
    component: () =>
      import(/* webpackChunkName: "HomePage" */ "@views/goal/showgoal.vue"),
  },

  {
    /** TODO */
    path: "/export",
    name: "export",
    component: () =>
      import(
        /* webpackChunkName: "export" */ "@views/overview/ExportTable.vue"
      ),
  },
  // Core -----------------------------------------------------------------------------------------
  {
    /** Home page */
    path: "/landingpage",
    name: "LandingPage",
    component: () =>
      import(/* webpackChunkName: "Core" */ "@views/LandingPage.vue"),
  },
  {
    /** TODO */
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "Core" */ "../views/About.vue"),
  },
  {
    /** 代理人身份切換 */
    path: "/agent",
    name: "Agent",
    component: () =>
      import(/* webpackChunkName: "Core" */ "../views/Agent.vue"),
  },
  {
    /** 500 Server Internal Server Error */
    path: "/error",
    name: "UnknownError",
    component: () =>
      import(/* webpackChunkName: "Core" */ "@views/UnknownError.vue"),
  },
  {
    /** 403 Forbidden */
    path: "/forbidden",
    name: "Forbidden",
    component: () =>
      import(/* webpackChunkName: "Core" */ "@views/Forbidden.vue"),
  },
  {
    /** Page not found */
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "Core" */ "@views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes,
});
// 判斷可行登入權限以及 time out----------------
// var goLogin = "login";
// var goRegister = "register";
// var goLogout = "logout";

// router.beforeEach(function(to, from, next) {
//   ViewUI.LoadingBar.start();
//   // const token = store.state.auth.canLogin;
//   // const sessionToken = store.state.auth.token;
//   // 已登入狀態
//   if (
//     to.name === "NotFound" ||
//     to.name === "Forbidden" ||
//     to.name === "UnknownError"
//   ) {
//     next();
//   }
//   if (store.state.auth.token !== null) {
//     if (to.name === "login" || to.name === "register")
//     {
//       router.push("/showgoal");
//     }
//     ViewUI.LoadingBar.finish();
//     next();
//   } else {
//     getAuthApi
//       .doGetCurrentAuthList({
//         token: "",
//       })
//       .then((result) => {
//         // 將查到的資料初始至使用者資料
//         if (result.body !== null) {
//           store.commit("auth/updateAuth", {
//             token: result.body.token,
//             uuid: result.body.uuid,
//             firstname: result.body.firstname,
//             lastname: result.body.lastname,
//             addr: result.body.addr,
//             gender: result.body.gender,
//             timeout: result.body.timeout,
//             height: result.body.height,
//             weight: result.body.weight,
//             email: result.body.email,
//             handphone: result.body.handphone,
//             birthday: result.body.birthday.split(" ")[0],
//             suspendOrNot: result.body.suspendOrNot,
//           });
//           next();
//         } else {
//           if (to.name === "login" || to.name === "register") {
//             next();
//           } else {
//             ViewUI.Message.error("你尚未登入！");
//             next("/login");
//           }
//         }
//       });
//   }
// });
router.beforeEach((to, from, next) => {
  if (
    to.name === "NotFound" ||
    to.name === "Forbidden" ||
    to.name === "UnknownError"
  ) {
    next();
  }
  if (store.state.auth.token) {
    if (to.name === "login" || to.name === "register") {
      next("/showgoal");
    } else {
      next();
    }
  } else {
    if (
      to.name === "login" ||
      to.name === "register"
    ) {
      next();
    } else {
      ViewUI.Message.error("你尚未登入！");
      next("/login");
    }
  }
});
//   if (
//     //尚未登入狀態，想要去以下頁面，OK!!
//     to.name === "NotFound" ||
//     to.name === "Forbidden" ||
//     to.name === "UnknownError"
//   ) {
//     next();
//     return;
//   } else {
//     if (store.state.auth.token === null) {
//       getAuthApi
//         .doGetCurrentAuthList({
//           token: "",
//         })
//         .then((result) => {
//           if (result !== null) {
//             store.commit("auth/updateAuth", {
//               token: result.body.token,
//               uuid: result.body.uuid,
//               firstname: result.body.firstname,
//               lastname: result.body.lastname,
//               addr: result.body.addr,
//               gender: result.body.gender,
//               timeout: result.body.timeout,
//               height: result.body.height,
//               weight: result.body.weight,
//               email: result.body.email,
//               handphone: result.body.handphone,
//               birthday: result.body.birthday.split(" ")[0],
//               suspendOrNot: result.body.suspendOrNot,
//             });
//             (store.state.auth.token = result.body.token),
//               router.push("/showgoal");
//             next();
//           } else {
//             ViewUI.Message.warning("5k4");
//             router.push("/login");
//           }
//           next();
//           return;
//         });
//     }
//     if (store.state.auth.token !== null) {
//       //想要去登入頁
//       if (
//         //已登入但是想去登入註冊頁面，不行!!
//         to.name === goLogin ||
//         to.name === goRegister
//       ) {
//         router.push("/showgoal");
//         return;
//         // 想要去其他頁面，直接放行
//       } else if (to.name === goLogout) {
//         alert("你已經登出!");
//         // router.push("/login");
//       } else {
//         next();
//         ViewUI.LoadingBar.finish();
//         return;
//       }
//       //未登入狀態
//     } else {
//       //未登入狀態想要去其他頁面，不行，直接導回登入頁面
//       alert(11);
//       ViewUI.Message.warning("你尚未登入喔");
//       router.push("/login");
//     }
//   }
//   next();
// });
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
