const state = {
  goalId: null,
  hasGoal: null,
  idealPacePerKm: null,
  idealDistance: null,
  setPeriod: null,
  isValid: null,
  lastDays: null,
  difficulty: null,
  creDateTime: null,
};
const getters = {};
const actions = {
  doUpdateGoalSet(context, payload) {
    context.commit("updateGoalSet", payload);
  },
};
const mutations = {
  //清除目標資料
  cleanGoalSet(state) {
    state.setPeriod = null;
    state.idealDistance = null;
    state.idealPacePerKm = null;
    state.hasGoal = false;
    state.goalId = null;
    state.isValid = null;
    state.lastDays = null;
    state.difficulty = null;
    state.creDateTime = null;
  },
  // 更新目標設定
  updateGoalSet(state, payload) {
    state.setPeriod = payload.setPeriod;
    state.idealDistance = payload.idealDistance;
    state.idealPacePerKm = payload.idealPacePerKm;
    state.hasGoal = payload.hasGoal;
    state.goalId = payload.goalId;
    state.isValid = payload.isValid;
    state.lastDays = payload.lastDays;
    state.difficulty = payload.difficulty;
    state.creDateTime = payload.creDateTime;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
