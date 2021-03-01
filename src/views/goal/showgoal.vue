<template>
  <div>
    <Card> <Icon type="ios-contact" />{{ firstname }} 用戶 </Card>
          <Card>
        <Form
          ref="formValidate"
          :model="formValidate"
          label-position="left"
          :label-width="20"
          :rules="ruleRaRuleValidate"
        >
          <Row>
            <Col span="8">
              <FormItem>
                <Date-picker
                  type="daterange"
                  placement="bottom-start"
                  placeholder="選擇日期"
                  style="width: 300px"
                  @on-change="dateChange"
                ></Date-picker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem  prop="isValid">
                <Select v-model="formValidate.isValid" placeholder="狀態">
                  <Option value="4">全部</Option>
                  <Option value="2">有效完成</Option>
                  <Option value="1">正在執行</Option>
                  <Option value="0">已經放棄</Option>
                </Select>
              </FormItem>
              <FormItem  prop="setPeriod">
                <Select v-model="formValidate.setPeriod" placeholder="週期">
                  <Option value="4">全部</Option>
                  <Option value="2">18周</Option>
                  <Option value="1">12周</Option>
                  <Option value="0">6周</Option>
                </Select>
              </FormItem>
              <FormItem  prop="difficulty" placeholder="難度">
                <Select v-model="formValidate.difficulty">
                  <Option value="4">全部</Option>
                  <Option value="2">簡單</Option>
                  <Option value="1">中等</Option>
                  <Option value="0">嚴格</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem  prop="idealDistanceBeg">
                <InputNumber                   
                  style="width:100%"
                  :min=0 
                  v-model.number="formValidate.idealDistanceBeg" 
                  placeholder="里程數起始區間"></InputNumber>
              </FormItem>
              <FormItem  prop="idealDistanceEnd">
                <InputNumber
                  style="width:100%"
                  :min=0 
                  v-model.number="formValidate.idealDistanceEnd" 
                  placeholder="里程數結束區間"></InputNumber>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem  prop="idealPacePerKmBeg">
                <InputNumber 
                  style="width:100%"
                  :min=0
                  v-model.number="formValidate.idealPacePerKmBeg" 
                  placeholder="目標分速起始區間"></InputNumber>
              </FormItem>
              <FormItem  prop="idealPacePerKmEnd">
                <InputNumber 
                  style="width:100%"
                  :min=0
                  v-model.number="formValidate.idealPacePerKmEnd" 
                  placeholder="目標分速結束區間"></InputNumber>
              </FormItem>
            </Col>
          </Row>
          <!-- <Row>
              123
          </Row> -->
          <Card>
            <div style="text-align:center; color:green">
              <Button v-on:click="handleQrySubmit('formValidate')">查詢</Button>
              <Button v-on:click="handleReset('formValidate')">重製</Button>
            </div>
          </Card>
        </Form>


      </Card>
    <!-- <Card style="text-align:left">
      <Button type="warning" @click="goFetchGoalCondition"
        ><Icon type="md-done-all" /> 檢視當前目標
      </Button>
    </Card> -->
    <Card style="text-align:right">
      <!-- <Button @click="goClickQryGoal('2')"
        ><Icon type="md-done-all" /> 完成
      </Button>
      <Button @click="goClickQryGoal('0')"
        ><Icon type="md-reorder" /> 放棄
      </Button>
      <Button @click="goClickQryGoal('1')" v-if="this.currentGoal === true">
        <Icon type="ios-play" />當前
      </Button> -->
      <Button @click="alertBeforeDelete" v-if="this.resetGoal === true">
        <Icon type="md-settings" />重設
      </Button>
    </Card>

    <Card>
      <Card>
        <Span> 您的訓練目標</Span>
        <div style="text-align:right">
          <Button @click="exportData">導出CSV</Button>
        </div>
      </Card>

      <Table
        border
        @on-sort-change="handleSortChange"
        :columns="goalTableColName"
        :data="goalTableData"
        size="small"
        ref="goalDataTable"
      ></Table>
      <!-- 新增目標 -->
      <Card>
        <div style="text-align:center">
          <Button @click="toDoAddGoal = true" v-if="this.goalExist !== true">
            新增目標
          </Button>
          <Page
            :total="total"
            size="small"
            show-elevator
            :current="pageNo"
            :page-size="pageSize"
            @on-change="changePage"
          ></Page>
        </div>
      </Card>
      <Modal
        v-model="toDoAddGoal"
        title="新增目標"
        @on-ok="handleSubmit('goalForm')"
        @on-cancel="toDoAddGoalCancel"
        :loading="loading"
      >
        <Form
          ref="goalForm"
          :model="goalForm"
          label-position="left"
          :label-width="200"
          :rules = "ruleValidate"
        >
          <FormItem label="訓練難度" prop="difficulty">
            <RadioGroup v-model="goalForm.difficulty">
              <Radio label="0">
                <Icon type="md-checkbox-outline"></Icon>
                <span>嚴格</span>
              </Radio>
              <Radio label="1">
                <Icon type="md-checkbox-outline"></Icon>
                <span>中等</span>
              </Radio>
              <Radio label="2">
                <Icon type="md-checkbox-outline"></Icon>
                <span>簡單</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="設定訓練周期(week)" prop="setPeriod">
            <RadioGroup v-model="goalForm.setPeriod">
              <Radio label="0">
                <Icon type="md-checkbox-outline"></Icon>
                <span>六周</span>
              </Radio>
              <Radio label="1">
                <Icon type="md-checkbox-outline"></Icon>
                <span>十二周</span>
              </Radio>
              <Radio label="2">
                <Icon type="md-checkbox-outline"></Icon>
                <span>十八周</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="目標每公里分速(min/km)" prop="idealPacePerKm">
            <InputNumber style="width:100%" :min=0 v-model="goalForm.idealPacePerKm"></InputNumber>
          </FormItem>
          <FormItem label="目標距離(km)" prop="idealDistance">
            <InputNumber style="width:100%" :min=0 v-model="goalForm.idealDistance"></InputNumber>
          </FormItem>
        </Form>
      </Modal>
    </Card>
    <Modal
          v-model="viewGoalCondition"
          title="Custom width"
          width="600"
          align="left"
        >
          <p slot="header" style="color:#2894FF;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>目標狀態</span>
          </p>
          <div slot="footer">
            <Button type="info" size="large" @click="viewGoalCondition = false"
              >關閉</Button
            >
          </div>
          <Span style="text-align:center; font-size:15px">
            <p>
              <img  style= "width:200px;height:200px; padding: 10px;" src="@/assets/images/logo.png" ></img>
            </p>
            <p>{{ actualData.viewGoalConditionText }}</p>
            <p>
              日期 : {{ creDateTime }}
            </p>
            <p><br/></p>
          </Span>
          <Card>
            <Span style="text-align:left;">
              <p>
                目標狀態 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:red">{{ actualData.actIsValid }}</Span>
              </p>
              <p>
                目標週期 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:red">{{ actualData.actSetPeriod }}</Span>
              </p>
              <p>
                目標里程數 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:red">{{ actualData.actIdealDistance }}</Span>
              </p>
              <p>
                目標難度 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:red">{{ actualData.actDifficulty }}</Span>
              </p>
              <p>
                目標公里分速 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:red">{{ actualData.actIdealPacePerKm }}</Span>
              </p>
            </Span>
          </Card>
          <Card >
            <Span style="text-align:left;">
              <p>
                紀錄天數 :  <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:blue">{{ avgData.haveDoneTimes }} </Span>
              </p>
              <p>
                平均里程數 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:blue">{{ avgData.avgDistance }} </Span>
              </p>
              <p>
                最快分速 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:blue">{{ avgData.fastPacePerKm }} </Span>
              </p>
              <p>
                平均心律 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:blue">{{ avgData.avgHeartrate }} </Span>
              </p>
              <p>
                平均海拔變化 : <Span style="font-weight:bold;margin: 0px 100px 0px 0px;color:blue">{{ avgData.avgEleVar }} </Span>
              </p>
            </Span>
          </Card>
        </Modal>
  </div>
</template>

<script>
import namingConverter from "@misc/naming-converter";
import qryavgdataApi from "@api/queryrunningactivity/qryavgdata-api.js";
import clearAuthApi from "@api/login/loginquery-api.js";
import queryhistorygoalApi from "@api/querygoal/queryhistorygoal-api.js";
import addgoalApi from "@api/addgoal/addgoal-api.js";
import deletegoalApi from "@api/querygoal/deletegoal-api.js";
import querylastdaysApi from "@api/querygoal/querylastdays-api.js";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      formValidate:{
        date: null,
        startDate: null,
        endDate: null,
        difficulty: null,
        isValid: null,
        setPeriod: null,
        idealDistanceBeg: null,
        idealDistanceEnd: null,
        idealPacePerKmBeg: null,
        idealPacePerKmEnd: null,
        creDateTime: null,
      },
      keyIsValid: null,
      tempsDate: null,
      notificationData: {
        // 需要 今日的日期， user的目標週期，計算出剩餘的天數
        title: "通知",
        desc: "null",
      },
      validCondition: null,
      actualData: {
        actIsValid: null,
        actSetPeriod: null,
        actIdealDistance: null,
        actDifficulty: null,
        actIdealPacePerKm: null,
      },
      avgData: {
        haveDoneTimes: null,
        avgDistance: null,
        fastPacePerKm: null,
        avgHeartrate: null,
        avgEleVar: null,
        timeTicks: null,
      },
      viewGoalConditionText: null,
      viewGoalCondition: false,
      newIsValid: null,
      goalExist: false,
      //-------------------------------------------------------------------------------------------------
      //--------------------------------------------------------------------------/** 其他 key 的設定 */
      // 預先設定一個空間給 getCurTime 的 function 來存放日期
      curTime: null,
      curPickTime: null,
      /** 控制重設目標的按鈕 */
      resetGoal: true,
      /** 控制當前目標的按鈕 */
      currentGoal: false,
      //-----------------------------------------------------------------------------------------------
      //-----------------------------------------------------------/** 在 iview page 裡面需要綁定的參數 */
      // 總筆數，預設為 0
      total: 0,
      // 分頁總數，預設為 10
      pageSize: 10,
      // 想要排序的欄位，預設為 空
      sortColumn: null,
      // 升冪排序或是降冪排序 ASC/DESC 升冪/降冪
      sortType: null,
      // 分頁總數， 預設為 "1"
      pageNo: 1,
      //------------------------------------------------------------------------------------------------

      // 控制是否可以新增
      toDoAddGoal: false,
      //----------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------/** Modal 設定 */
      // Table 的欄位設定
      goalTableColName: [
        {
          title: "檢視",
          key: "viewCheck",
          fixed: "center",
          width: 90,
          render: (h, { row }) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.goFetchAvgData(row);
                    },
                  },
                },
                "檢視"
              ),
            ]);
          },
        },
        {
          title: "目標狀態",
          key: "isValid",
          sortable: "custom",
        },
        {
          title: "創建日期",
          key: "creDateTime",
          sortable: "custom",
        },
        {
          title: "目標周期(周)",
          key: "setPeriod",
          sortable: "custom",
        },
        {
          title: "目標里程數(km)",
          key: "idealDistance",
          sortable: "custom",
        },
        {
          title: "目標難度",
          key: "difficulty",
          sortable: "custom",
        },
        {
          title: "目標公里分速(min/km)",
          key: "idealPacePerKm",
          sortable: "custom",
        },
      ],
      // Table 的資料存放區
      goalTableData: [],
      // Bind 搜尋目標的表格
      goalForm: {
        setPeriod: "",
        idealPacePerKm: null,
        idealDistance: null,
        difficulty: null,
      },
      // qryRaForm 表格的驗證方式
      ruleRaRuleValidate: {
        idealPacePerKmBeg: [
          {
            type: "number",
            message: "目標分速起始區間須為數字",
            trigger: "blur",
          },
        ],
        idealPacePerKmEnd: [
          {
            type: "number",
            message: "目標分速結束區間須為數字",
            trigger: "blur",
          },
        ],
        idealDistanceBeg: [
          {
            type: "number",
            message: "目標里程數結束區間須為數字",
            trigger: "blur",
          },
        ],
        idealDistanceEnd: [
          {
            type: "number",
            message: "目標里程數結束區間須為數字",
            trigger: "blur",
          },
        ],
      }, 
      // goalForm表格資料的驗證方式
      ruleValidate: {
        setPeriod: [
          {
            required: true,
            message: "訓練週期不可為空值",
            trigger: "blur",
          },
        ],
        idealPacePerKm: [
          {
            pattern: /^[1-9]{1}[0-9]{0,2}$/,
            message: "請輸入合理數字",
            trigger: "blur",
          },
        ],
        difficulty: [
          {
            required: true,
            message: "目標難度不可為空值",
            trigger: "blur",
          },
        ],
        idealDistance: [
          {
            pattern: /^[1-9]{1}[0-9]{0,2}$/,
            message: "請輸入合理數字",
            trigger: "blur",
          },
        ],
      },
      // 控制 Modal 是否被卡住的 key，當沒有 loading 這個 key ，Modal 不管輸入正確或是錯誤，都會被關閉
      // 但是我們不想要錯誤也關閉，故設定這個 key
      loading: true,
      //-----------------------------------------------------------------------------------------------
    };
  },
  computed: {
    //----------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------/** 引入 store 內的 state */
    // showgoal 的 state
    // 同步 store 目標資料
    ...mapState("showgoal", [
      "idealPacePerKm",
      "idealDistance",
      "setPeriod",
      "goalId",
      "lastDays",
      "difficulty",
      "isValid",
      "creDateTime",
    ]),
    // 同步 store 用戶資料
    ...mapState("auth", [
      "uuid",
      "suspendOrNot",
      "exp",
      "firstname",
      "height",
      "weight",
      "email",
      "token",
      "lastname",
      "handphone",
      "addr",
      "birthday",
      "gender",
    ]),
    // 同步 store 跑步資料
    ...mapState("runningactivity", [
      "runningActivityId",
      "calories",
      "distance",
      "elevationVariation",
      "heartRate",
      "pacePerKm",
    ]),
  },
  methods: {
    handleQrySubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.goClickQryGoal();
        } else {
          this.$swal("不好意思!","輸入格式有誤!","warning");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.formValidate.isValid = null;
      this.formValidate.setPeriod = null;
      this.formValidate.difficulty = null;
    },
    dateChange(date) {
      this.formValidate.date = date;
      this.formValidate.startDate = date[0];
      this.formValidate.endDate = date[1];
    },
    handleSortChange: async function(col) {
      if (!this.total) {
        return;
      }
      // normal: 取消排序
      if (col.order === "normal") {
        this.pageNo = 1;
        this.sortColumn = null;
        this.sortType = null;
      }
      // normal: 取消排序
      if (col.order !== "normal") {
        this.pageNo = 1;
        this.sortColumn = namingConverter.camelCase2UnderscoreUppercase(
          col.key
        );
        this.sortType = col.order.toUpperCase();
      }
      // 依據條件使用資訊
      await this.goClickQryGoal(this.keyIsValid);
    },
      clickQryLastDays: async function() {
        let result = await querylastdaysApi.doQueryLastDaysList({
          // 欲查詢目標狀態
          isValid: "0",
          uuid: this.uuid,
          token: this.token,
        })
        if (result.status === "200") {
          if (result.body[0] == null) {
            this.getCurTime();
          } else {
              this.tempsDate = result.body[0].periodDays - result.body[0].spanDays;
              this.getDesc();
          }
        } else {
          this.$swal("警訊……", result.status, "error")
        }
    },
    getDesc() {
      this.notificationData.desc =
        this.firstname +
        "  用戶 目前設定的目標為  " +
        this.setPeriod +
        "  周訓練計畫  " +
        "  剩餘  " +
        this.tempsDate +
        " 天就完成囉!!";
    },
    time() {
      if (this.tempsDate != null && this.setPeriod != null){
          this.$Notice.open({
          title: this.notificationData.title,
          desc: this.notificationData.desc,
          duration: 2,
        });
      } 
    },
    // 獲取 後端的平均資料 的 api
    goFetchAvgData: async function(row) {
      
      this.actualData.actIsValid = row.isValid;
      this.actualData.actSetPeriod = row.setPeriod;
      this.actualData.actIdealDistance = row.idealDistance;
      this.actualData.actDifficulty = row.difficulty;
      this.actualData.actIdealPacePerKm = row.idealPacePerKm;
      if (row.isValid == "已經放棄") {
        this.newIsValid = "0";
      }
      if (row.isValid == "正在執行") {
        this.newIsValid = "1";
      }
      if (row.isValid == "有效完成") {
        this.newIsValid = "2";
      }
      let result = await qryavgdataApi.doQryAvgDataList({
        uuid: row.uuid,
        goalId: row.goalId,
        creDateTime: row.creDateTime,
        // 查詢完成的資料
        isValid: '1',
        token: this.token,
      });
      if (result.status === "200") {
        if (result.body !== null) {
          this.viewGoalCondition = true;
          this.avgData.haveDoneTimes = result.body.odata[0].haveDoneTimes;
          this.avgData.avgDistance = result.body.odata[0].avgDistance;
          this.avgData.fastPacePerKm = result.body.odata[0].fastPacePerKm;
          this.avgData.avgHeartrate = result.body.odata[0].avgHeartrate;
          this.avgData.avgEleVar = result.body.odata[0].avgEleVar;
          this.avgData.timeTicks = result.body.odata[0].timeTicks;
          // this.getDifficultyText();
          // this.calculate();
          // if (this.goalCondition == "完成") {
          //   this.updateToFinishGoal("2");
          // }
          // if (this.goalCondition == "目標失敗!") {
          //   this.updateToFinishGoal("0");
          // }
          this.actualData.viewGoalConditionText = "編號 : " + row.goalId;
          // alert(row.goalId);
        }
      } else {
        this.$swal("不好意思!", "系統異常!", "error");
      }
    },
    goFetchGoalCondition() {
      this.$router.push("fetchavgdata");
    },
    //---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------/**分頁設定*/
    // 分頁的 onChange
    changePage(page) {
      this.pageNo = page;
      // alert(this.pageNo);
      this.goClickQryGoal(this.validCondition);
    },
    //---------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------/**新增目標設定*/
    // 送出新增的資料
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.toDoAddGoalOk();
          this.toDoAddGoal = false;
        } else {
          this.$swal("系統資訊", "輸入格式有誤!", "error");
          // 做一個 類似 deadlock 的東西，把它可以在格式錯誤的時候，Modal 也不會消失
          setTimeout(() => {
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
          }, 1000);
        }
      });
    },
    // 取消新增
    toDoAddGoalCancel() {
      this.$Message.info("取消新增資料");
    },
    // 新增目標
    toDoAddGoalOk: async function() {
      this.goClickQryGoal("1");
      if (this.goalExist !== true) {
        let result = await addgoalApi.doAddGoalList({
          uuid: this.uuid,
          creator: this.uuid,
          updater: this.uuid,
          token: this.token,
          // 新增資料的數據
          setPeriod: this.goalForm.setPeriod,
          idealPacePerKm: this.goalForm.idealPacePerKm,
          idealDistance: this.goalForm.idealDistance,
          difficulty: this.goalForm.difficulty,
        });
        if (result.status === "200") {
          if (result.body !== 0) {
            if (result.body === 1) {
              this.$swal("Good!", "新增目標成功!", "success");
              this.goClickQryGoal("1");
            } if (result.body === 2 ) {
              // 登出api
                clearAuthApi.doClearCurrentAuthList({
                  token: ""
                }).then(()=> 
                  {
                    this.$swal("叮嚀!", "此為停權帳號，有任何問題請電洽管理員 0926123456!", "warning");
                    this.$router.push({ path: "/login" });
                  }
                ) 
            }if (result.body === 3 ) {
                this.$swal("叮嚀!", "你已經有目標了喔!", "warning");
                this.$router.push({ path: "/showgoal" });
              // 登出api
                // clearAuthApi.doClearCurrentAuthList({
                //   token: ""
                // }).then(()=> 
                //   {
                //     this.$swal("叮嚀!", "此為停權帳號，有任何問題請電洽管理員 0926123456!", "warning");
                //     this.$router.push({ path: "/login" });
                //   }
                // ) 
            }
          }
        } else {
          if (this.goalForm.idealPacePerKm == null || this.goalForm.idealDistance == null ) {
            this.$swal("系統資訊", "輸入資料不能有空值!", "error");
          } else{
              this.$swal("警訊..", "系統異常!", "error");
          }
        }
      } else {
        this.$swal("不好意思", "用戶當前已有目標!", "warning");
      }
    },
    //---------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------/**刪除目標設定*/
    //提示後，確認刪除
    deleteConfirm: async function() {
      let result = await deletegoalApi.doDeleteGoalList({
        uuid: this.uuid,
        goalId: this.goalId,
        token: this.token,
      });
      if (result.status === "200") {
        if (result.body !== null) {
          this.$swal("通知!", "刪除成功!", "success");
          // 查詢當前目標
          this.goClickQryGoal("1");
          // 清除目標的資料
          this.cleanGoalSet();
          // this.hasGoal = false;
          // alert(this.goalId);
          this.goalExist = false;
          // 因為沒目標資料了，所以打開目標資料的設定
          this.toDoAddGoal = true;
        } else {
          this.$swal("不好意思……", "系統出現異常！", "error");
        }
      } else {
        this.$swal("不好意思……", "系統出現異常！", "error");
      }
    },
    // 刪除前提示
    alertBeforeDelete() {
      this.$Modal.confirm({
        title: "警告",
        content: "<p>確定要放棄修練，重設目標?</p>",
        okText: "OK",
        cancelText: "Cancel",
        onOk: () => {
          this.deleteConfirm();
          this.goalTableData = [];
        },
      });
    },
    //---------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------/** 查詢目標設定 */
    clickQryGoal: async function(situation) {
      this.validCondition = situation;
      this.resetGoal = false;
      this.currentGoal = true;
      let result = await queryhistorygoalApi.doQueryHistoryGoalList({
        startDate: this.formValidate.startDate,
        endDate: this.formValidate.endDate,
        setPeriod: this.formValidate.setPeriod,
        difficulty: this.formValidate.difficulty,
        idealDistanceBeg: this.formValidate.idealDistanceBeg,
        idealDistanceEnd: this.formValidate.idealDistanceEnd,
        idealPacePerKmBeg: this.formValidate.idealPacePerKmBeg,
        idealPacePerKmEnd: this.formValidate.idealPacePerKmEnd,
        // 欲查詢目標狀態
        isValid: this.formValidate.isValid,
        // 一頁資料的資料筆數
        pageSize: 10,
        // 分頁總數
        pageNo: this.pageNo,
        // 想要排序的欄位
        sortColumn: this.sortColumn,
        // 升冪排序或是降冪排序
        sortType: this.sortType,
        // user id
        uuid: this.uuid,
        token: this.token,
      });
      if (result.status == 200) {
          this.goalTableData = result.body.data;
          this.total = result.body.totalCount;
          this.pageNo = result.body.pageNo;
        if (result.body.data[0] == null) {
          this.goalExist = false;
          // this.$swal("通知", "尚無對應資料", "warning");
          // if (this.formValidate.isValid === "0") {
          //   this.$swal("不好意思……", "用戶尚無放棄目標!", "warning");
          // } else if (this.formValidate.isValid === "1") {
          //   if (this.goalExist === false) {
          //     this.$swal("不好意思……", "用戶尚無當前目標!", "warning");
          //   }
          // } else if (this.formValidate.isValid == "2") {
          //   this.$swal("不好意思……", "用戶尚無完成目標!", "warning");
          // }
        } else {
          // this.goalTableData = result.body.data;
          // this.total = result.body.totalCount;
          // this.pageNo = result.body.pageNo;
          if (situation === "1" || this.formValidate.isValid === "1") {
            // 如果有當前目標的話，則關掉"當前目標"的按鈕，打開"重設目標"的按鈕
            this.currentGoal = false;
            this.resetGoal = true;
            this.goDoUpdateGoalSet({
              goalId: result.body.data[0].goalId,
              // hasGoal: true,
              idealPacePerKm: result.body.data[0].idealPacePerKm,
              idealDistance: result.body.data[0].idealDistance,
              setPeriod: result.body.data[0].setPeriod,
              isValid: result.body.data[0].isValid,
              difficulty: result.body.data[0].difficulty,
              creDateTime: result.body.data[0].creDateTime,
            });
            this.goalExist = true;
          }
        }
      } else {
        this.$swal("警訊……", result.status, "error");
      }
    },
    // 查詢目標 (0/1/2) -> (放棄/當前/放棄)
    goClickQryGoal(situation) {
      // this.goDoUpdateGoalSet({
      //   isValid: situation,
      // });
      if (this.formValidate.isValid ==="4") {
        this.formValidate.isValid = null
      }
      if (this.formValidate.difficulty==="4") {
        this.formValidate.difficulty = null
      }
      if (this.formValidate.setPeriod ==="4"){
        this.formValidate.setPeriod = null
      }
      this.clickQryGoal(situation);
      this.keyIsValid = situation;
    },
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------/**導入store 資料 */
    // 引入 store 的 showgoal 的 Mutation 的 function "cleanGoalSet"
    ...mapMutations("showgoal", ["cleanGoalSet"]),
    // 引入 store 的 showgoal 的 Action 的 "doUpdateGoalSet"
    ...mapActions("showgoal", ["doUpdateGoalSet"]),
    // 將 "doUpdateGoalSet" Action 實現成為 function 使之得以被呼叫使用
    goDoUpdateGoalSet(payload) {
      this.doUpdateGoalSet(payload);
    },
    //-----------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------/** 其他功能設定 */
    // 導出 csv
    exportData() {
      this.$refs.goalDataTable.exportCsv({
        filename: "goal_export",
        columns: this.goalTableColName,
        data: this.goalTableData,
      });
      this.$swal("通知", "匯出成功", "info");
    },
    // 抓取當前日期
    getCurTime() {
      var times = new Date(+new Date()+ 8 * 3600 * 1000) ;
      this.curTime = times.toISOString().split("T")[0];
      this.curPickTime = times.toISOString().split("T")[1].split(".")[0];
      this.formValidate.isValid = "1"
    },
    test() {
      if (this.goalId === null) {
        this.goalExist = false
      }
    }
    //-----------------------------------------------------------------------------------------------
    // goUpdateGoalCondition() {
    //   if (this.curPickTime == "16:24:59") {
    //     this.goFetchAvgData();
    //   }
    // },
  },
  created() {
    // 取得當前日期
    // this.getCurTime();
    // // 查詢當前目標
    // this.goClickQryGoal();
    // this.clickQryLastDays();
  },
  activated() {
    // // 查詢還剩多少天
    // alert(this.curPickTime);
    this.getCurTime();
    this.goClickQryGoal();
    this.clickQryLastDays();
    this.getDesc();
    this.time();
    this.test();
  },
  destroyed () {
    this.goFetchGoalCondition();
  }
};
</script>
