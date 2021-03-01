<template>
  <div>
    <Poptip
      content="content"
      placement="bottom"
      trigger="hover"
      v-model="visible"
      transfer
    >
      <div>{{ userInfoCard.cname }}</div>
      <div slot="content" class="slotPoptip infoCardContainer">
        <div class="infoCardIconContainer">
          <!-- 頭像 -->
          <div class="infoCardIcon" :class="sex" :style="userImage"></div>
        </div>
        <div class="infoCardContentContainer">
          <!-- 人員名稱 -->
          <div class="infoCardName">
            {{ userInfoCard.cname }} {{ userInfoCard.employeeNo }}
          </div>
          <!-- 人員處級單位 -->
          <div class="infoCardDivision">
            {{ userDivision }}
          </div>
          <!-- 人員部級以下單位 -->
          <div class="infoCardDept">
            {{ department }}
          </div>
          <!-- 人員職稱 -->
          <div class="infoCardPosition">{{ userInfoCard.jobTitleName }}</div>
          <!-- 人員電話號碼 -->
          <div class="infoCardTel">
            {{ telephone }}
          </div>
          <div class="infoCardBtnContainer">
            <!-- 撥號功能 -->
            <a @click.prevent="doAutoDial" v-if="dialable">
              <div class="infoCardBtn" :style="phoneImage"></div>
            </a>
            <!-- EMAIL功能 -->
            <a v-if="userInfoCard.officeEmail" :href="emailLink">
              <div class="infoCardBtn" :style="mailImage"></div>
            </a>
          </div>
        </div>
      </div>
    </Poptip>

    <!-- 系統撥號顯示 -->
    <esun-alert
      :value.sync="alertModal.loading"
      :title="alertModal.title"
      :content="alertModal.content"
    ></esun-alert>
  </div>
</template>

<script>
import infoCardApi from "@api/core/info-card-api";

export default {
  components: {},
  props: {
    // 使用者AD帳號
    adAccount: {
      type: String,
      default: "",
      required: true
    },
    // 執行查詢計數器
    fireQueryCounter: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      // 顯示popTip
      visible: false,
      // 是否為信用卡處人員
      isCreditCardMember: false,
      // 被查詢者AD帳號
      queriedAdAccount: "",
      // 使用者卡片資訊
      userInfoCard: {},
      // 使用者處級單位名稱
      userDivision: "",
      // 使用者部門層級以下名稱
      userDept: [],
      // 系統撥號顯示
      alertModal: {
        loading: false,
        title: "",
        content: ""
      },
      // 頭像圖案
      userImage: {
        backgroundImage: "url(" + require("@assets/images/ic_gray_user.svg")
      },
      // 電話圖案
      phoneImage: {
        backgroundImage: "url(" + require("@assets/images/ic_gray_phone.svg")
      },
      // 寄信圖案
      mailImage: {
        backgroundImage: "url(" + require("@assets/images/ic_gray_mail.svg")
      }
    };
  },
  computed: {
    /** 信箱連結 */
    emailLink: function() {
      return (
        "mailto:" +
        this.userInfoCard.officeEmail +
        "?subject=" +
        this.userInfoCard.cname +
        this.userInfoCard.employeeNo
      );
    },
    /** 受話者電話號碼 */
    telephone: function() {
      if (this.userInfoCard.deptPhoneNo && this.userInfoCard.officePhoneext) {
        return (
          this.userInfoCard.deptPhoneNo + "#" + this.userInfoCard.officePhoneext
        );
      }

      return this.userInfoCard.deptPhoneNo;
    },
    /** 受話者部門層級以下單位 */
    department: function() {
      if (this.userDept.length > 1) {
        return this._.join(this.userDept, " / ");
      }

      return this._.head(this.userDept);
    },
    /** 受話者性別 */
    sex: function() {
      return this.userInfoCard.genderCode === "1" ? "male" : "female";
    },
    /** 是否可進行撥號 */
    dialable: function() {
      return this.userInfoCard.isDialable === "Y"; // Y: 可撥號
    }
  },
  methods: {
    /**
     * 系統撥號
     */
    doAutoDial: async function() {
      this.alertModal.title = "通知";
      this.alertModal.content = "系統撥號中...";
      this.alertModal.loading = true;

      await infoCardApi.callAutoDial(this.userInfoCard);

      setTimeout(() => {
        this.alertModal.loading = false;
      }, 3000);
    },
    /**
     * 取得行內使用者資訊卡片資訊
     */
    doGetBankUserInfoCard: async function() {
      this.userInfoCard = await infoCardApi.doGetBankUserInfoCard({
        adAccount: this.adAccount
      });

      // 取得被查詢者所屬單位清單
      let deptName = this._.split(this.userInfoCard.deptName, " ");
      this.userDivision = this._.head(deptName);
      this.userDept = this._.drop(deptName);
    }
  },
  watch: {
    /**
     * 監控AD帳號
     */
    adAccount: function(value) {
      if (this.queriedAdAccount !== value) {
        this.doGetBankUserInfoCard();
      }

      this.queriedAdAccount = value;
    },
    /**
     * 監控觸發事件，重新查詢資訊卡片
     */
    fireQueryCounter: {
      handler: function() {
        if (this.adAccount !== this.queriedAdAccount) {
          this.doGetBankUserInfoCard();
        }
      },
      immediate: true
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  activated() {},
  deactivated() {
    this.alertModal.loading = false;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
.infoCardContainer {
  padding: 10px 5px 45px 5px;
  display: inline-block;
}
.infoCardIconContainer {
  margin-right: 20px;
}
.infoCardIcon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(167, 166, 166, 0.15);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
}
.infoCardIcon.female {
  background-color: rgba(255, 165, 186, 0.15);
}
.infoCardIcon.male {
  background-color: rgba(134, 177, 225, 0.15);
}
.infoCardIconContainer,
.infoCardContentContainer {
  float: left;
}
.infoCardContentContainer {
  line-height: 1.5;
}
.infoCardName {
  font-size: 20px;
}
.infoCardPosition {
  color: #979797;
}
.infoCardBtnContainer {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.infoCardBtnContainer a {
  float: left;
  margin-right: 15px;
}
.infoCardBtn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #979797;
  background-repeat: no-repeat;
  background-size: 26px;
  background-position: center;
  opacity: 0.9;
}
.infoCardBtn:hover {
  background-color: #fbfbfb;
  opacity: 1;
}
\deep\.ivu-poptip-inner {
  border-radius: 10px;
}
</style>
