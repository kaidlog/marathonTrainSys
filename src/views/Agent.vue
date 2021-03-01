<template>
  <Card style="width:500px">
    <Form
      ref="agentProfile"
      :model="agentProfile"
      :label-width="170"
      :rules="ruleInline"
      label-position="left"
    >
      <Form-item prop="adAccount" label="被代理人AD帳號">
        <Input type="text" v-model="agentProfile.adAccount" :maxlength="20" />
      </Form-item>
      <Form-item>
        <Button type="primary" @click="doSwitchIdentify">送出</Button>
      </Form-item>
    </Form>
  </Card>
</template>

<script>
import userProfileApi from "@api/core/user-profile-api";

export default {
  components: {},
  props: {},
  data() {
    return {
      agentProfile: {
        adAccount: ""
      },
      ruleInline: {
        adAccount: [
          { required: true, message: "請輸入被代理人AD帳號", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    /**
     * 代理人身份切換
     */
    doSwitchIdentify: function() {
      this.$refs["agentProfile"].validate(valid => {
        if (valid) {
          userProfileApi
            .doSwitchIdentify({
              adAccount: this._.toUpper(this.agentProfile.adAccount)
            })
            .then(userProfile => {
              if (userProfile) {
                this.$Message.info("身份切換完成");
              } else {
                this.$Message.error("被代理人資料不存在");
              }
            });
        }
      });
    }
  },
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
