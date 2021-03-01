const state = {
    todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false },
    ]
};
const getters = {
    doneTodos: state => {
        return state.todos.filter(todo => todo.done);
    },
    doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
    }
};
const actions = {

};
const mutations = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
