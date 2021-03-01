<template>
  <div>
    <BlockUI :message="msg" v-show="isShowSpinner">
      <font-awesome-icon icon="cog" size="3x" spin fixed-width>
      </font-awesome-icon>
    </BlockUI>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  props: {},
  data() {
    return {
      msg: "資料處理中，請稍候..."
    };
  },
  computed: {
    ...mapGetters(["isShowSpinner"])
  },
  methods: {},
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
  destroyed() {}
};
</script>

<style lang="scss" scoped></style>
