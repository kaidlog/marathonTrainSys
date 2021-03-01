<template>
  <div id="app">
    <Layout :style="{ minHeight: '100vh' }">
      
      <Header
        :style="{
          background: '#219EBC',
          width: '100%',
          height: '80px',
        }"
        >
        <div style="align-items:center;display:flex; font-size: 100%; color:white ">
            <img style= "cursor:pointer;width:80px;height:80px; padding: 10px" src="@/assets/images/logo.png" @click="BackToHomePage"></img>
            <Span style="cursor:pointer;"><p v-on:click="BackToHomePage"> M.T.System</p></Span>
          <!-- <div style="width:100%"><Button style="float:right" v-if="showLogout() == true" @click="toDoUpdatePw = true"/>ejj</div> -->
            <!-- <div style="width:100%">
              <Span><Icon type="ios-notifications" /></Span>
            </div> -->
          <div style="width:100%">
            <Button type="text" v-if="showLogout() == true" @click="goLogout" style="float:right;margin: 0px 30px 0px 30px"><Icon type="ios-log-out" />登出</Button>
            <Button type="text" v-if="showLogout() == true" style="float:right" @click="goNotification"><Icon type="ios-person" /></Button>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider v-model="isCollapsed" 
        :style="{
          background: '#8ECAE6'
        }"
        >
          <Menu
          ref="menu"
            theme="light"
            width="auto"
            :class="menuitemClasses"
            v-if="showLogout() == true"
            :active-name="activateName"
            :open-names="openName"
            :style="{background: '#8ECAE6'}"
          >
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper" />
                目標管理
              </template>
              <MenuItem name="/overview" to="/overview">
                <Icon type="ios-navigate"></Icon>
                統計圖表
              </MenuItem>
              <MenuItem name="/showgoal" to="/showgoal">
                <Icon type="ios-navigate"></Icon>
                目標管理
              </MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-paper" />
                跑步活動
              </template>
              <MenuItem name="/showrunningactivity" to="/showrunningactivity">
                <Icon type="ios-navigate"></Icon>
                <span>
                  跑步紀錄
                </span>
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-paper" />
                個人
              </template>
              <MenuItem name="/editprofile" to="/editprofile">
                <Icon type="ios-navigate"></Icon>
                <span>
                  個人資料
                </span>
              </MenuItem>
              <!-- <MenuItem name="/notification" to="/notification">
                <Icon type="ios-navigate"></Icon>
                <span>
                  通知
                </span>
              </MenuItem> -->
            </Submenu>
            <Submenu name="4" v-if="showManage()==true">
              <template slot="title">
                <Icon type="ios-paper" />
                管理員
              </template>
            <!-- 這個東西要管理者才能看到 -->
              <MenuItem name="/userauthmanage" to="/userauthmanage" >
                <Icon type="ios-navigate"></Icon>
                <span>
                  權限管理
                </span>
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <Header
            :style="{
              background: '#8ECAE6',
              boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',
              height: '80px',
            }"
            > 
            <div style="color: #023047">{{ date }}</div>
          </Header>
          <br />
          <Content :style="{ padding: '0 16px 16px' }">
            <Card
              :style="{
                background: '#white',
              }">
              <Content :style="{ background: '#white',padding: '40px 30px' }">
                <keep-alive>
                  <router-view />
                </keep-alive>
              </Content>
            </Card>
          </Content>
          <Footer :style="{ textAlign: 'center' }"
            >© Marathon Train System</Footer
          >
        </Layout>
      </Layout>
    </Layout>
    <BackTop></BackTop>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import clearAuthApi from "@api/login/loginquery-api.js";
import getAuthApi from "@api/login/loginquery-api.js";
// import {  mapMutations } from "vuex";
export default {
  data() {
    return {
      activateName:"",
      openName:[],
      isCollapsed: false,
      date: new Date(),
      notificationData: {
        // 需要 今日的日期， user的目標週期，計算出剩餘的天數
        title: "通知",
        desc: "null",
      },
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    // 將授權所有的欄位叫進來
        // 同步 store 目標資料
    ...mapState("showgoal", [
      "hasGoal",
      "idealPacePerKm",
      "idealDistance",
      "setPeriod",
      "goalId",
      "lastDays"
    ]),
    // 同步 store 用戶資料
    ...mapState("auth", [
      "uuid",
      "canLogin",
      "exp",
      "firstname",
      "height",
      "weight",
      "email",
      "token",
      "lastname",
      "handphone",
      "addr",
      "birthday",
      "gender",
      "suspendOrNot",
    ]),
    // 同步 store 跑步資料
    ...mapState("runningactivity", [
      "runningActivityId",
      "calories",
      "distance",
      "elevationVariation",
      "heartRate",
      "pacePerKm",
    ]),
    getToken() {
      return this.$store.state.auth.token;
    },
  },
  methods: {
    goNotification(){
      // alert("yes");
      this.$router.push({ path: "/editprofile" })
    },
    time() {
      this.$Notice.open({
        title: this.notificationData.title,
        desc:  this.firstname +
              "  用戶 目前設定的目標為  " +
              this.setPeriod +
              "  周訓練計畫  " +
              "  剩餘  " +
              this.lastDays +
              "  天就完成囉!!  ",
        duration: 0,
      });
    },
    // 做登出的動作
    goLogout() {
      clearAuthApi.doClearCurrentAuthList({
        token: ""
      }).then(()=> 
        {
          this.$swal("通知...", "用戶您已登出", "info");
          this.$router.push({ path: "/login" });
        }
      ) 
      // this.cleanrunningactivitySet();
      // this.cleanGoalSet();
      // this.cleanAuth();
      // window.sessionStorage.clear();
      // this.$swal("通知...", "用戶您已登出", "info")
      // this.$router.push({ path: "/login" });
      // window.location.reload();
    },
    // Icon 需要回到首頁的 router push
    BackToHomePage() {
      this.$router.push({ path: "/showgoal" });
    },
    // 登出用的 清除目標資料的 mutation
    ...mapMutations("showgoal", ["cleanGoalSet"]),
    // 登出用的 清除跑步資料的 mutation
    ...mapMutations("runningactivity", ["cleanrunningactivitySet"]),
    // 登出用的 清除授權資料的 mutation
    ...mapMutations("auth", ["cleanAuth"]),
    // 如果有 token 的狀態， 則 showLogout
    showManage(){
      if( this.suspendOrNot !== "2") {
        return false;
      } else {
        return true;
      }
    },
    showLogout() {
      if (this.token !== null) {
        return true;
      } else {
        return false;
      }
    },
    // 如果有 token 不為空的狀態， 則 showSlider
    showSlider() {
      if (this.token !== null) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    getToken(newToken) {
      if (newToken !== null) {
        this.$router.push("/");
      }
      else{
        this.$router.push("/login");

      }
    },
    // 觀察 router 如果去到 哪個 path 就把對應的 menu 打開
    $route(to) {
      this.activateName = to.path
      if (to.path === "/editprofile") {
        this.openName = ['3']
      }
      if (to.path === "/showgoal") {
        this.openName = ['1']
      }
      if (to.path === "/showrunningactivity") {
        this.openName = ['2']
      } 
      if (to.path === "/userauthmanage") {
        this.openName = ['4']
      } 
      else {
        this.openName = ['1']
      }
      // if (this.$refs.menu !== undefined){
      //   // $nextTick 會在 dom 渲染或是掛載完成後，自動執行
      //   this.$nextTick(()=>{
      //        this.$refs.menu.updateOpened();
      //        this.$refs.menu.updateActiveName();
      //     })
      // }
    }
  },
  beforeCreate() {},
  created() {
     getAuthApi
      .doGetCurrentAuthList({
        token: "",
      })
      .then((result) => {
        if (result === null) {
          this.$store.commit("cleartAuth");
        }
      });
  },
  beforeMount() {},
  mounted() {
    var _this = this; //宣告一個變數指向vue例項this,保證作用域一致
    this.timer = setInterval(function() {
      _this.date = new Date(); //修改資料date
    }, 1000);
  },
  activated() {
    this.showLogout();
  },
  deactivated() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue例項destory前，清除我們的定時器
    }
  },
  destroyed() {},
};
</script>
<style scoped>
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
