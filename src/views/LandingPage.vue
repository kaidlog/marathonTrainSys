<template>
  <div class="home">
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  components: {},
  props: {},
  data() {
    return {
      modal9: false,
      result: "",
    };
  },
  computed: {
    ...mapState("showgoal", ["hasGoal"]),
  },
  methods: {  
    checkHasGoal() {
      if (this.hasGoal == 1) {
        this.$router.push("showgoal")
      } else {
        this.$router.push("showgoal")
      }
    },
  },
  watch: {},
  beforeCreate() {},
  created() {
    this.checkHasGoal();
  },
  beforeMount() {},
  mounted() {
  },
  activated() {},
  deactivated() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped></style>
