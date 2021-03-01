const state = {
  token: null,
  timeout: null,
  firstname: null,
  lastname: null,
  addr: null,
  handphone: null,
  uuid: null,
  height: null,
  weight: null,
  email: null,
  birthday: null,
  gender: null,
  suspendOrNot: null,
};
const getters = {};
const actions = {
  // 登入 action
  doUpdateAuth(context, payload) {
    context.commit("updateAuth", payload);
  },
};
const mutations = {
  // 登入 mutation
  updateAuth(state, payload) {
    state.firstname = payload.firstname;
    state.lastname = payload.lastname;
    state.handphone = payload.handphone;
    state.gender = payload.gender;
    state.uuid = payload.uuid;
    state.height = payload.height;
    state.weight = payload.weight;
    state.email = payload.email;
    state.token = payload.token;
    state.timeout = payload.timeout;
    state.addr = payload.addr;
    state.birthday = payload.birthday;
    state.suspendOrNot = payload.suspendOrNot;
  },
  // 登出 mutation
  cleanAuth(state) {
    state.uuid = null;
    state.firstname = null;
    state.height = null;
    state.weight = null;
    state.token = null;
    state.timeout = null;
    state.email = null;
    state.lastname = null;
    state.handphone = null;
    state.gender = null;
    state.addr = null;
    state.birthday = null;
    state.suspendOrNot = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
