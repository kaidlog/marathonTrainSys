<template>
  <slidePanel :width="550" :show="show" title="新增知識" @changeShow="hide">
    <div class="docs-body"></div>
  </slidePanel>
</template>
<script>
export default {
  props: {
    show: false,
  },
  methods: {
    hide() {
      this.$emit("onHide");
    },
  },
};
</script>
