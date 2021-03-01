<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="button" value="登出" @click="doLogOut" />
    <input type="button" value="取得token" @click="getToken" />
    <input type="button" value="AJAX測試" @click="doQryCardList" />
    <input type="button" value="測試" @click="doTest" />
    <a href="http://172.19.35.115:8081/index">MVC Site</a>

    <input v-model="cdId" placeholder="edit me" />
    <sys-cd-select
      :ctId="1"
      :value.sync="cdId"
      :multiple="false"
      :readonly="false"
    ></sys-cd-select>

    <sys-cd-radio
      :ctId="1"
      :value.sync="cdId"
      :readonly="false"
      :vertical="false"
      :border="true"
    ></sys-cd-radio>

    <input v-model="cdIds" placeholder="edit me" />
    <sys-cd-checkbox
      :ctId="1"
      :value.sync="cdIds"
      :readonly="false"
      :border="true"
    ></sys-cd-checkbox>

    <Select v-model="model1" style="width:200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">
        {{ item.label }}
      </Option>
    </Select>

    <Spinner></Spinner>
    <Countdown></Countdown>
    <ArrowTopButton></ArrowTopButton>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    <Card :bordered="true">
      <p slot="title" style="background-color: red; margin-top:0">
        Borderless card
      </p>
      <p>Content of card</p>
      <p>Content of card</p>
      <p>Content of card</p>
    </Card>

    <Row>
      <Col span="12">
        {{ value1 }}
        <date-picker
          :value="value1"
          type="date"
          format="yyyy/MM/dd"
          placeholder="Select date"
          style="width: 200px"
          @on-change="value1 = $event"
        ></date-picker>
      </Col>
      <Col span="12">col-12</Col>
    </Row>
  </div>
</template>

<script>
import Spinner from "@components/misc/Spinner.vue";
import Countdown from "@components/misc/Countdown.vue";
import ArrowTopButton from "@components/misc/ArrowTopButton.vue";

import f010101Api from "@api/f01/f010101-api";
import coreApi from "@api/core/code-api";
import sessionKeeperApi from "@api/core/session-keeper-api";

export default {
  components: {
    Spinner,
    Countdown,
    ArrowTopButton
  },
  props: {},
  data() {
    return {
      cdId: null,
      cdIds: ["C", "P"],
      value1: "2020-01-02",
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: ""
    };
  },
  computed: {},
  methods: {
    logout: function() {
      // this.$router.push({ name: "Unauthorized" });
      // this.$keycloak.logoutFn();
      sessionKeeperApi.doLogOut();
    },
    getToken: function() {
    },
    showDate: function() {
      alert(this.value1);
    },
    doTest: async function() {
      let result = await coreApi.doQryCodeLabelValueList({
        ctId: 2
      });

      alert(JSON.stringify(result));
    },
    async doQryCardList() {
      let result = await f010101Api.doQryCardList({
        cardId: "11",
        cardType: "01",
        ownerId: "A123456789"
      });

      alert(JSON.stringify(result));
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
