<template>
  <div>
    <transition name="zoom">
      <Button
        v-show="showArrowButton"
        size="large"
        icon="md-arrow-round-up"
        class="rightBottom"
        type="primary"
        shape="circle"
        @click="toTop"
      >
      </Button>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      /** 是否顯示置頂按鈕 */
      showArrowButton: false
    };
  },
  computed: {},
  methods: {
    /** 滑重捲軸時，設定是否顯示點擊置頂按鈕 */
    handleScroll: function() {
      this.showArrowButton = window.scrollY > 60;
    },
    /** 頁面往上至頂 */
    toTop() {
      window.scroll(0, 0);
    }
  },
  watch: {},
  beforeCreate() {},
  created() {
    /** 設定捲軸滑動監聽處理器 */
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeMount() {},
  mounted() {},
  activated() {},
  deactivated() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    /** 移除捲軸滑動監聽處理器 */
    window.removeEventListener("scroll", this.handleScroll);
  },
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.rightBottom {
  // background-color: #1e9691;
  // border-color: #1e9691;
  position: fixed;
  right: 0px;
  bottom: 10px;
  z-index: 20;
}
</style>
