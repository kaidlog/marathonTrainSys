<template>
  <CheckboxGroup
    :id="elementId"
    v-model="selectedItems"
    @on-change="$emit('update:value', $event)"
  >
    <Checkbox
      v-for="item in items"
      :label="item.value"
      :key="item.value"
      :disabled="readonly"
      :border="border"
    >
      <span>{{ item.label }}</span>
    </Checkbox>
  </CheckboxGroup>
</template>

<script>
import codeApi from "@api/core/code-api";

export default {
  components: {},
  props: {
    // 下拉選單選中的值
    value: {
      type: Array,
      required: false
    },
    // 是否唯讀
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否顯示邊框
    border: {
      type: Boolean,
      required: false,
      default: false
    },
    // 元件ID
    elementId: {
      type: String,
      required: false
    },
    // 類別代碼
    ctId: {
      type: Number,
      required: true
    },
    // 明細代碼
    cdId: {
      type: String,
      required: false
    },
    // 是否停用
    suspend: {
      type: String,
      required: false
    },
    // 其它用途註記 01
    flag01: {
      type: String,
      required: false
    },
    // 其它用途註記 02
    flag02: {
      type: String,
      required: false
    },
    // 其它用途註記 03
    flag03: {
      type: String,
      required: false
    },
    // 其它用途註記 04
    flag04: {
      type: String,
      required: false
    },
    // 其它用途註記 05
    flag05: {
      type: String,
      required: false
    },
    // 其它用途註記 06
    flag06: {
      type: String,
      required: false
    },
    // 其它用途註記 07
    flag07: {
      type: String,
      required: false
    },
    // 其它用途註記 08
    flag08: {
      type: String,
      required: false
    },
    // 其它用途註記 09
    flag09: {
      type: String,
      required: false
    },
    // 其它用途註記 10
    flag10: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      items: [],
      selectedItems: []
    };
  },
  computed: {
    clearable: function() {
      return !this.readonly;
    }
  },
  methods: {
    /**
     * 取得Checkbox選單選項清單
     */
    doQryCodeLabelValueList: async function() {
      if (this.items.length > 0) {
        return;
      }

      this.items = await codeApi.doQryCodeLabelValueList({
        ctId: this.ctId,
        cdId: this.cdId,
        suspend: this.suspend,
        flag01: this.flag01,
        flag02: this.flag02,
        flag03: this.flag03,
        flag04: this.flag04,
        flag05: this.flag05,
        flag06: this.flag06,
        flag07: this.flag07,
        flag08: this.flag08,
        flag09: this.flag09,
        flag10: this.flag10
      });
    },
    /**
     * 若選單中存在父元件選值則改選中值, 不存在則清空父元件選值
     */
    doUpdateSelectedValue: async function() {
      await this.doQryCodeLabelValueList();

      let vm = this;
      vm.selectedItems = vm.value;
      if (!vm.selectedItems || vm.selectedItems.length < 1) {
        return;
      }

      let isExists = vm._.find(vm.items, function(o) {
        return vm._.includes(vm.selectedItems, o.value);
      });

      if (!isExists) {
        this.$emit("update:value", null);
      }
    }
  },
  watch: {
    value: function() {
      this.doUpdateSelectedValue();
    }
  },
  beforeCreate() {},
  created() {
    this.doUpdateSelectedValue();
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

<style lang="scss" scoped></style>
