<template>
  <div>
    <div v-if="!formId">
      <Button
        type="primary"
        class="process-btn"
        :size="buttonSize"
        @click="doNotifyPreprocess('Started')"
      >
        傳送
      </Button>
    </div>
    <div v-if="formId">
      <Button
        v-for="stage in stageActionList"
        :value="stage.cdId"
        :key="stage.cdId"
        :size="buttonSize"
        :type="doSetButtonType(stage.cdId)"
        :class="doSetButtonClass(stage.cdId)"
        @click="doNotifyPreprocess(stage.cdId)"
      >
        {{ stage.cdNm }}
      </Button>
    </div>

    <Modal
      v-model="isShowStageUser"
      title="流程關卡"
      width="40vh"
      :closable="false"
      :mask-closable="false"
    >
      <Form
        ref="stageUserForm"
        label-position="left"
        :model="stageUserForm"
        :rules="sendFormValidate"
        :label-width="150"
      >
        <Row>
          <FormItem label="處理者：" prop="processorId">
            <Select
              v-model="stageUserForm.processorId"
              filterable
              remote
              @on-change="doUpdSigner"
            >
              <Option
                v-for="user in stageProcessors"
                :value="user.processorId"
                :key="user.processorId"
              >
                {{ user.processorName }}({{ user.processorId }})
              </Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="簽核意見：" prop="signComment">
            <Input
              v-model="stageUserForm.signComment"
              type="textarea"
              :maxlength="1000"
              :rows="3"
              show-word-limit
            ></Input>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <Button
          class="modal-btn"
          type="info"
          :size="buttonSize"
          @click="doCancel"
          >取消</Button
        >
        <Button
          class="modal-btn"
          type="primary"
          :size="buttonSize"
          @click="doFormSubmit('stageUserForm')"
          >確定</Button
        >
      </div>
    </Modal>

    <Modal
      v-model="isShowBackProcess"
      title="退回流程"
      width="40vh"
      :closable="false"
      :mask-closable="false"
    >
      <Form
        ref="backStageForm"
        label-position="left"
        :model="backStageForm"
        :rules="backStageFormValidate"
        :label-width="150"
      >
        <Row>
          <FormItem label="簽核意見：" prop="signComment">
            <Input
              v-model="backStageForm.signComment"
              type="textarea"
              :maxlength="1000"
              :rows="3"
              show-word-limit
            ></Input>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <Button
          class="modal-btn"
          type="info"
          :size="buttonSize"
          @click="doCancel"
          >取消</Button
        >
        <Button
          class="modal-btn"
          type="primary"
          :size="buttonSize"
          @click="doFormSubmit('backStageForm')"
          >確定</Button
        >
      </div>
    </Modal>

    <Modal
      v-model="isShowConfirmView"
      class="esun-modal"
      title="通知"
      width="50vh"
      :closable="false"
      :mask-closable="false"
    >
      <div class="info-background"></div>
      <p>請確認是否要送出？</p>
      <div slot="footer">
        <Button
          class="modal-btn"
          type="info"
          :size="buttonSize"
          @click="doCancel"
          >取消</Button
        >
        <Button
          class="modal-btn"
          type="primary"
          :size="buttonSize"
          @click="$emit('on-submit-preprocess', actionId)"
          >確定</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import bpmFormApi from "@api/common/bpm-form-api";

/**
 * 1. BpmSubmitter props
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *    | 屬性                 說明                                           類型                     是否為必填(M|O)               默認值
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *    | fireOpenCounter      開啟BPM視窗次數計數器                           Number                   M                            0
 *    | fireSubmitCounter    BPM表單送出次數計數器                           Number                   M                            0
 *    | formId               業務單號                                       String                   O(BPM表單送出時需要)          -
 *    | flowCode             流程代碼                                       String                   M                            -
 *    | businessCode         業務別代碼-起單時需要                           String                   O(起單時需要)                 -
 *    | formUrl              業務表單網址-寄email需要                        String                   M                            -
 *    | formTypeName         表單種類名稱-寄email需要                        String                   M                            -
 *    | description          備註說明-寄email需要                            String                   O(BPM發信時需要)              -
 *    | buttonSize           BPM按鈕大小                                    String                   O(調整大小時需要)             default
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *
 * 2. BpmSubmitter events
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *    | 事件名                說明                                                                   返回值
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *    | on-open-preprocess   點擊BPM按鈕時觸發(如傳送、退回、處理權移轉等)                              actionId: 關卡動作代碼
 *    | on-submit-preprocess BPM表單即將送出時觸發                                                    actionId: 關卡動作代碼
 *    | on-signer-change     變動簽核者異動時觸發                                                     {
 *    |                                                                                                processorType: 處理者類型,
 *    |                                                                                                processorId: 處理者ID,
 *    |                                                                                                processorName: 處理者名稱
 *    |                                                                                             }
 *    | on-start-complete    起單作業完成時觸發                                                       {
 *    |                                                                                                bpmFormSeqNo: BPM表單主鍵,
 *    |                                                                                                message: API回應訊息,
 *    |                                                                                                statusCode: API回應代碼
 *    |                                                                                             }
 *    | on-operate-complete  傳送作業完成時觸發                                                       {
 *    |                                                                                                message: API回應訊息,
 *    |                                                                                                statusCode: API回應代碼
 *    |                                                                                             }
 *    | on-returned          退回作業完成時觸發                                                       {
 *    |                                                                                                message: API回應訊息,
 *    |                                                                                                statusCode: API回應代碼
 *    |                                                                                             }
 *    | on-revoked           銷案作業完成時觸發                                                       {
 *    |                                                                                                message: API回應訊息,
 *    |                                                                                                statusCode: API回應代碼
 *    |                                                                                             }
 *    | on-closed            結案作業完成時觸發                                                       {
 *    |                                                                                                message: API回應訊息,
 *    |                                                                                                statusCode: API回應代碼
 *    |                                                                                             }
 *    | on-cancel            點擊簽核視窗的取消按鈕時觸發                                              -
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 */
export default {
  components: {},
  props: {
    // 開啟BPM視窗次數計數器
    fireOpenCounter: {
      type: Number,
      required: true,
      default: 0
    },
    // BPM表單送出次數計數器
    fireSubmitCounter: {
      type: Number,
      required: true,
      default: 0
    },
    // 業務單號
    formId: {
      type: String,
      required: false
    },
    // 流程代碼
    flowCode: {
      type: String,
      required: true
    },
    // 業務別代碼(起單時需要)
    businessCode: {
      type: String,
      required: false
    },
    // 業務表單網址(寄email需要)
    formUrl: {
      type: String,
      required: true
    },
    // 表單種類名稱(寄email需要)
    formTypeName: {
      type: String,
      required: true
    },
    // 備註說明(寄email需要)
    description: {
      type: String,
      required: false
    },
    // BPM按鈕大小
    buttonSize: {
      type: String,
      required: false,
      default: "default"
    }
  },
  data() {
    return {
      // 關卡動作代碼, Ref DATASHARE.TB_SYS_CD.CD_ID, CT_ID=167
      actionId: "",
      // 關卡人員列表
      stageProcessors: [],
      // 關卡人員表單
      stageUserForm: {
        processorId: "",
        processorName: "",
        processorType: "",
        signComment: ""
      },
      // 傳送的表單驗證
      sendFormValidate: {
        processorId: [
          {
            required: true,
            message: "請選擇處理者",
            trigger: "change"
          }
        ],
        signComment: [
          {
            required: true,
            message: "請填寫簽核意見",
            trigger: "blur"
          }
        ]
      },
      // 是否顯示處理者視窗
      isShowStageUser: false,
      // 退回的表單驗證
      backStageFormValidate: {
        signComment: [
          {
            required: true,
            message: "請填寫簽核意見",
            trigger: "blur"
          }
        ]
      },
      // 關卡動作代碼清單
      stageActionList: [],
      // 是否顯示退回視窗
      isShowBackProcess: false,
      // 關卡退回表單
      backStageForm: {
        signComment: ""
      },
      // 是否顯示銷案(結案)確認視窗
      isShowConfirmView: false
    };
  },
  computed: {},
  methods: {
    /**
     * 取得關卡傳送類型
     */
    doQryNextStageAction: async function() {
      if (this.formId) {
        let result = await bpmFormApi.doQryNextStageAction(this.flowCode, {
          formId: this.formId
        });

        this.stageActionList = result.stageAction;
      }
    },
    /**
     * 傳送預處理事件(如表單驗證)、動作代碼給父元件
     */
    doNotifyPreprocess: function(actionId) {
      this.actionId = actionId;
      this.$emit("on-open-preprocess", actionId);
    },
    /**
     * 取得關卡處理者資料
     */
    doQryStageProcessor: async function() {
      let result = await bpmFormApi.doQryStageProcessor(this.flowCode, {
        actionId: this.actionId,
        formId: this.formId
      });

      this.stageUserForm.processorType = result.processorType;
      this.stageProcessors = result.stageProcessors;
      this.isShowStageUser = true;
    },
    /**
     * 表單驗證，並將簽核視窗關閉，及發出BPM表單即將送出的事件
     */
    doFormSubmit: async function(refName) {
      this.$refs[refName].validate(async valid => {
        if (valid) {
          this.isShowStageUser = false;
          this.isShowBackProcess = false;
          this.$emit("on-submit-preprocess", this.actionId);
        }
      });
    },
    /**
     * 傳送簽核者異動事件，並將簽核者ID、簽核者名稱給父元件
     */
    doUpdSigner: function(processorId) {
      if (this.stageUserForm.processorId) {
        let processorName = this._.find(this.stageProcessors, {
          processorId: this.stageUserForm.processorId
        }).processorName;

        this.stageUserForm.processorName = processorName;

        this.$emit("on-signer-change", processorId, {
          processorType: this.stageUserForm.processorType,
          processorId: processorId,
          processorName: processorName
        });
      }
    },
    /**
     * 起單作業，並將api執行結果傳給父元件
     */
    doStartProcess: async function() {
      let payload = this.doBuildProcBasicData(this.stageUserForm.signComment);
      payload.businessCode = this.businessCode;
      payload.processorId = this.stageUserForm.processorId;
      payload.processorName = this.stageUserForm.processorName;
      payload.processorType = this.stageUserForm.processorType;

      let result = await bpmFormApi.doStartProcess(this.flowCode, payload);
      let returnData = this.doBuildReturnBasicData(result);

      returnData.bpmFormSeqNo = result.bpmFormSeqNo;

      this.$emit("on-start-complete", returnData);
    },
    /**
     * 送單作業，並將api執行果傳給父元件
     */
    doSendProcess: async function() {
      let payload = this.doBuildProcBasicData(this.stageUserForm.signComment);
      payload.processorType = this.stageUserForm.processorType;
      payload.processorId = this.stageUserForm.processorId;
      payload.processorName = this.stageUserForm.processorName;

      let result = await bpmFormApi.doSendProcess(this.flowCode, payload);

      this.isShowStageUser = false;
      this.$refs["stageUserForm"].resetFields();

      this.$emit("on-operate-complete", this.doBuildReturnBasicData(result));
    },
    /**
     * 處理權移轉作業，並將api執行結果傳給父元件
     */
    doTransferProcess: async function() {
      let result = await bpmFormApi.doTransferProcess({
        formId: this.formId,
        newProcessorId: this.stageUserForm.processorId,
        signComment: this.stageUserForm.signComment
      });

      this.isShowStageUser = false;
      this.$refs["stageUserForm"].resetFields();

      this.$emit("on-operate-complete", this.doBuildReturnBasicData(result));
    },
    /**
     * 退回作業，並將api執行結果傳給父元件
     */
    doSendBack: async function() {
      let payload = this.doBuildProcBasicData(this.backStageForm.signComment);
      let result = await bpmFormApi.doSendBack(this.flowCode, payload);

      this.isShowBackProcess = false;
      this.$refs["backStageForm"].resetFields();

      this.$emit("on-returned", this.doBuildReturnBasicData(result));
    },
    /**
     * 銷案作業，並將api執行結果傳給父元件
     */
    doRevokeProcess: async function() {
      this.isShowConfirmView = false;
      let payload = this.doBuildProcBasicData("銷案");
      let result = await bpmFormApi.doRevokeProcess(this.flowCode, payload);

      this.$emit("on-revoked", this.doBuildReturnBasicData(result));
    },
    /**
     * 結案作業，並將api執行結果傳給父元件
     */
    doCloseProcess: async function() {
      this.isShowConfirmView = false;
      let payload = this.doBuildProcBasicData("結案");
      let result = await bpmFormApi.doCloseProcess(this.flowCode, payload);

      this.$emit("on-closed", this.doBuildReturnBasicData(result));
    },
    /**
     * 傳送取消傳送事件給父元件，並關閉簽核視窗及資料清空
     */
    doCancel: function() {
      this.$refs["stageUserForm"].resetFields();
      this.$refs["backStageForm"].resetFields();
      this.isShowStageUser = false;
      this.isShowBackProcess = false;
      this.isShowConfirmView = false;
      this.actionId = "";
      this.$emit("on-cancel");
    },
    /**
     * 設定BPM按鈕類型
     */
    doSetButtonType: function(value) {
      // Started: 起單、1: 傳送
      if (value === "Started" || value === "1") {
        return "primary";
      }

      // 4: 退回前一關、7: 退回填表人
      if (value === "4" || value === "7") {
        return "warning";
      }

      // delegate: 處理權移轉、2: 銷案、3: 結案
      if (value === "delegate" || value === "2" || value === "3") {
        return "error";
      }

      return "info";
    },
    /**
     * 設定BPM按鈕class
     */
    doSetButtonClass: function(value) {
      // 8: 傳送(其他主管同仁)
      return value === "8" ? "process-wide-btn" : "process-btn";
    },
    /**
     * 組建流程所需基本欄位資料
     */
    doBuildProcBasicData: function(signComment) {
      return {
        formId: this.formId,
        signComment: signComment,
        actionId: this.actionId,
        mail: {
          mailParams: {
            formTypeName: this.formTypeName,
            formId: this.formId,
            url: this.formUrl,
            description: this.description
          }
        }
      };
    },
    /**
     * 組建流程執行結果資料
     */
    doBuildReturnBasicData: function(result) {
      return {
        message: result.message,
        statusCode: result.statusCode
      };
    }
  },
  watch: {
    fireOpenCounter: function() {
      // Started: 起單、delegate: 處理權移轉、1: 傳送
      if (
        this.actionId === "Started" ||
        this.actionId === "delegate" ||
        this.actionId === "1"
      ) {
        this.doQryStageProcessor();
        return;
      }

      // 2: 銷案、3: 結案
      if (this.actionId === "2" || this.actionId === "3") {
        this.isShowConfirmView = true;
        return;
      }

      // 4: 退回前一關、7: 退回填表人
      if (this.actionId === "4" || this.actionId === "7") {
        this.isShowBackProcess = true;
        return;
      }
    },
    fireSubmitCounter: function() {
      // Started: 起單
      if (this.actionId === "Started") {
        this.doStartProcess();
        this.$refs["stageUserForm"].resetFields();
        return;
      }

      // delegate: 處理權移轉
      if (this.actionId === "delegate") {
        this.doTransferProcess();
        this.$refs["stageUserForm"].resetFields();
        return;
      }

      // 1: 傳送
      if (this.actionId === "1") {
        this.doSendProcess();
        this.$refs["stageUserForm"].resetFields();
        return;
      }

      // 2: 銷案
      if (this.actionId === "2") {
        this.doRevokeProcess();
        return;
      }

      // 3: 結案
      if (this.actionId === "3") {
        this.doCloseProcess();
        return;
      }

      // 4: 退回前一關、7: 退回填表人
      if (this.actionId === "4" || this.actionId === "7") {
        this.doSendBack();
        this.$refs["backStageForm"].resetFields();
        return;
      }
    }
  },
  beforeCreate() {},
  created() {
    this.doQryNextStageAction();
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

<style lang="scss" scoped>
.process-btn {
  margin-left: 10px;
  width: 120px;
}
.process-wide-btn {
  margin-left: 10px;
  width: 200px;
}
.modal-btn {
  width: 120px;
}
.info-background {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 100px;
  background-image: url(../../assets/images/ic_big_red_alert.svg);
  margin-bottom: 20px;
}
</style>
