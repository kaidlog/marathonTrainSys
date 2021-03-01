<template>
  <Menu
    ref="leftMenus"
    accordion
    width="270"
    :active-name="activeItem"
    :open-names="openItem"
  >
    <!-- <div v-for="(item, index) in leftMenus" :key="index">
      <Submenu
        v-if="item.subMenuList && item.subMenuList.length > 0"
        :name="item.menuSeqNo"
      >
        <template slot="title">
          <Icon :type="item.iconText" /> {{ item.itemNm }}
        </template>
        <MenuItem
          v-for="(item, index) in item.subMenuList"
          :key="index"
          :name="item.itemUri"
          :to="item.itemUri"
          :target="item.redirectTypeCd == 'P' ? '_self' : '_blank'"
        >
          haha
          <Icon :type="item.iconText" />{{ item.itemNm }}
        </MenuItem>
      </Submenu>
      <MenuItem
        v-else
        :name="item.itemUri"
        :to="item.itemUri"
        :target="item.redirectTypeCd == 'P' ? '_self' : '_blank'"
      >
        <Icon :type="item.iconText" />{{ item.itemNm }}
      </MenuItem>
    </div> -->
  </Menu>
</template>

<script>
//import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  props: {},
  data() {
    return {
      activeItem: "",
      openItem: [],
      itemName: ""
    };
  },
  computed: {
    //...mapGetters(["leftMenus"])
  },
  methods: {
    /** Focus左側選單項目 */
    //doFocusLeftMenuItem(itemUri) {
      //this.leftMenus.some(element => {
        // 1. 第一層選單 ------------------------------------------------------------------------------------------------
        //if (itemUri && itemUri === element.itemUri) {
          //this.itemName = element.itemNm;
          //this.itemName = 吃大便便;
          //return true;
        //}
        // 2. 第二層選單 ------------------------------------------------------------------------------------------------
        //let item = this._.find(element.subMenuList, { itemUri: itemUri });
        //if (item) {
          //this.itemName = item.itemNm;
          //this.$set(this.openItem, 0, element.menuSeqNo);
          //this.$nextTick(() => {
            //this.$refs.leftMenus.updateOpened();
            //this.$refs.leftMenus.updateActiveName();
          //});
          //return true;
        //}
      //});
      /** 儲存當前URI功能標題 */
      //this.doUpdateFunctionTitle({ title: this.itemName });
    //},
    /** 更新URI功能標題 */
    //...mapActions(["doUpdateFunctionTitle"])
  },
  watch: {
    //$route() {
      //this.activeItem = this.$route.path;
      //this.doFocusLeftMenuItem(this.$route.path);
    //}
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
div {
  text-align: left;
  color: #3c4c5e;
}
.ivu-menu-vertical .ivu-menu-item {
  padding: 8px 24px;
}
.ivu-menu-vertical .ivu-menu-item:hover {
  font-weight: bolder;
  color: #3c4c5e;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: #8ECAE6;
  font-weight: bolder;
  margin-left: 3px;
  z-index: 2;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu)::after {
  right: auto;
  width: 3px;
  height: 50%;
  top: 25%;
}
.ivu-icon {
  margin: 5px;
}
.ivu-menu > .ivu-menu-item {
  font-size: 16px;
  color: #3c4c5e;
  padding: 8px 22px !important;
}
/deep/ .ivu-menu-submenu-title:hover {
  font-weight: bolder !important;
  color: #3c4c5e !important;
}
/deep/ .ivu-menu-submenu {
  width: 90%;
  margin-left: 9px;
}
/deep/ .ivu-menu-submenu-title {
  padding: 8px 10px !important;
}
</style>
