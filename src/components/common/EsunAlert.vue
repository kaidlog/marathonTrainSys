<template>
  <div>
    <Modal
      v-model="isVisible"
      @on-visible-change="$emit('update:value', $event)"
      width="40vh"
      class="esun-modal"
    >
      <div class="alert-background" :class="classes"></div>
      <p>{{ content }}</p>
      <div slot="header">
        <p>{{ title }}</p>
      </div>
      <div slot="footer">
        <Button class="cus-btn" type="primary" size="large" @click="closeModal"
          >確定</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // 是否顯示訊息彈跳示窗
    value: {
      type: Boolean,
      default: false,
      require: true
    },
    // 標題
    title: {
      type: String,
      default: "標題",
      required: true
    },
    // 內容
    content: {
      type: String,
      default: "",
      required: false
    },
    // 樣式
    type: {
      type: String,
      default: "info",
      required: false
    }
  },
  data() {
    return {
      // 是否顯示modal
      isVisible: false
    };
  },
  computed: {
    classes: function() {
      return this.type + "-background";
    }
  },
  methods: {
    closeModal: function() {
      this.isVisible = false;
    }
  },
  watch: {
    value(newValue) {
      this.isVisible = newValue;
    }
  },
  beforeCreate() {},
  created() {},
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

<style lang="less" scoped>
.esun-modal {
  text-align: center;
}
/deep/ .ivu-modal-header {
  border-bottom: 0;
}
/deep/ .ivu-modal-footer {
  border-top: 0;
}
/deep/ .ivu-modal-body {
  padding: 20px 60px 60px 60px;
  font-size: 22px;
  line-height: 1.5;
}
.alert-background {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 100px;
}
.success-background {
  background-image: url(../../assets/images/ic_big_green_success.svg);
  margin-bottom: 20px;
}
.error-background {
  background-image: url(../../assets/images/ic_big_red_x.svg);
  margin-bottom: 20px;
}
.info-background {
  background-image: url(../../assets/images/ic_big_red_alert.svg);
  margin-bottom: 20px;
}
.cus-btn {
  width: 250px;
}
</style>
