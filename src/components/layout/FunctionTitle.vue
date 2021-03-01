<template>
  <div>
    <header>{{ this.title }}</header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["title"])
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
