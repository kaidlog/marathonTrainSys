const state = {
    runningActivityId: "",
    calories: 0,
    distance: 0,
    elevationVariation: 0,
    heartRate: 0,
    pacePerKm: 0,
};
const getters = {};
const actions = {
    doUpdateRunningActivitySet(context, payload) {
        context.commit("updateRunningActivitySet", payload);
    }
};
const mutations = {
    cleanRunningActivitySet(state) {
        state.runningActivityId = "";
        state.calories = "";
        state.distance = "";
        state.elevationVariation = "";
        state.heartrate = "";
        state.pacePerKm = "";
      },
      updateRunningActivitySet(state, payload) {
        state.runningactivityId = payload.runningactivityId;
        state.calories = payload.calories;
        state.distance = payload.distance;
        state.elevationvariation = payload.elevationvariation;
        state.heartrate = payload.heartrate;
        state.pacePerKm = payload.pacePerKm;
      }
};
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
  